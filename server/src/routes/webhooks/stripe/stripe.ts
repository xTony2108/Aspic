import express from "express";
import Stripe from "stripe";
import crypto from "crypto";

import { stripe } from "../../../lib/stripe/stripe.js";
import { config } from "../../../config.js";
import { logger } from "../../../logger.js";

import Appointment from "../../../db/models/Appointment.js";
import User from "../../../db/models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const signature = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      config.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err: any) {
    logger.error(`[STRIPE] Invalid webhook signature: ${err.message}`);

    return res.status(400).send(err.message);
  }

  logger.info(`[STRIPE] Event received: ${event.type} (${event.id})`);

  try {
    await stripeWebhookDispatcher(event);

    return res.sendStatus(200);
  } catch (err: any) {
    logger.error(`[STRIPE] Webhook processing failed: ${event.id}`, err);

    return res.sendStatus(500);
  }
});

/**
 * =========================================
 * STRIPE WEBHOOK DISPATCHER
 * =========================================
 */

export const stripeWebhookDispatcher = async (event: Stripe.Event) => {
  switch (event.type) {
    /**
     * =========================================
     * CHECKOUT COMPLETED
     * =========================================
     */

    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      if (session.payment_status !== "paid") {
        logger.warn(`[STRIPE] Session ${session.id} not paid`);

        return;
      }

      const appointmentId = session.metadata?.appointmentId;

      if (!appointmentId) {
        logger.warn("[STRIPE] appointmentId missing in metadata");

        return;
      }

      const appointment = await Appointment.findById(appointmentId);

      if (!appointment) {
        logger.warn(`[STRIPE] Appointment not found: ${appointmentId}`);

        return;
      }

      /**
       * IDEMPOTENCY
       */

      if (appointment.status === "confirmed") {
        logger.info(`[STRIPE] Appointment already confirmed: ${appointmentId}`);

        return;
      }

      const cancellationToken = crypto.randomBytes(32).toString("hex");

      if (
        appointment.status === "date_change_pending" &&
        appointment.pendingDateChange?.previousStatus === "awaiting_payment"
      ) {
        appointment.pendingDateChange.previousStatus = "confirmed";
      } else {
        appointment.status = "confirmed";
      }

      appointment.stripe.sessionId = session.id;

      appointment.stripe.paymentIntentId = session.payment_intent?.toString();

      appointment.stripe.amountPaid = session.amount_total || 0;

      appointment.stripe.paidAt = new Date();

      appointment.cancellation.token = cancellationToken;

      appointment.cancellation.expiresAt = new Date(
        appointment.appointmentDate.getTime() - 48 * 60 * 60 * 1000,
      );

      await appointment.save();

      logger.info(
        `[STRIPE] Appointment confirmed after payment: ${appointmentId}`,
      );

      // await sendPaymentConfirmationEmail(
      //   appointment,
      //   cancellationToken,
      // );

      break;
    }

    /**
     * =========================================
     * PAYMENT FAILED
     * =========================================
     */

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      const appointmentId = paymentIntent.metadata?.appointmentId;

      if (!appointmentId) {
        logger.warn(
          "[STRIPE] appointmentId missing in payment_intent metadata",
        );

        return;
      }

      const appointment = await Appointment.findById(appointmentId);

      if (!appointment) {
        logger.warn(
          `[STRIPE] Appointment not found for failed payment: ${appointmentId}`,
        );

        return;
      }

      if (
        appointment.status === "date_change_pending" &&
        appointment.pendingDateChange?.previousStatus === "awaiting_payment"
      ) {
        appointment.pendingDateChange.previousStatus = "payment_failed";
        await appointment.save();
      } else {
        appointment.status = "payment_failed";
        await appointment.save();
      }

      logger.warn(`[STRIPE] Payment failed for appointment: ${appointmentId}`);

      // await sendPaymentFailedEmail(...)

      break;
    }

    /**
     * =========================================
     * REFUND SUCCEEDED
     * =========================================
     */

    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;

      if (!charge.payment_intent) {
        logger.warn(
          `[STRIPE] Missing payment_intent in refunded charge ${charge.id}`,
        );

        return;
      }

      const paymentIntentId = charge.payment_intent.toString();

      const appointment = await Appointment.findOne({
        "stripe.paymentIntentId": paymentIntentId,
      });

      if (!appointment) {
        logger.warn(
          `[STRIPE] Appointment not found for refund: ${paymentIntentId}`,
        );

        return;
      }

      appointment.status = "refunded";

      appointment.stripe.refundedAt = new Date();

      await appointment.save();

      logger.info(`[STRIPE] Appointment refunded: ${appointment._id}`);

      // await sendRefundConfirmationEmail(...)

      break;
    }

    /**
     * =========================================
     * REFUND FAILED
     * =========================================
     */

    case "charge.refund.updated": {
      const refund = event.data.object as Stripe.Refund;

      if (refund.status !== "failed") {
        return;
      }

      const charge = await stripe.charges.retrieve(refund.charge as string);

      if (!charge.payment_intent) {
        logger.warn(`[STRIPE] Missing payment_intent in refund failure`);

        return;
      }

      const appointment = await Appointment.findOne({
        "stripe.paymentIntentId": charge.payment_intent.toString(),
      });

      if (!appointment) {
        logger.warn(`[STRIPE] Appointment not found for failed refund`);

        return;
      }

      /**
       * Refund failed -> restore paid status
       */

      appointment.status = "awaiting_payment";

      await appointment.save();

      logger.error(
        `[STRIPE] Refund failed for appointment: ${appointment._id}`,
      );

      break;
    }

    /**
     * =========================================
     * STRIPE CONNECT ACCOUNT UPDATED
     * =========================================
     */

    case "account.updated": {
      const account = event.data.object as Stripe.Account;

      const requirementsDue = account.requirements?.currently_due || [];

      const onboardingCompleted =
        account.details_submitted &&
        account.charges_enabled &&
        account.payouts_enabled;

      const accountStatus =
        account.charges_enabled && account.payouts_enabled
          ? "active"
          : requirementsDue.length > 0
            ? "restricted"
            : "pending";

      await User.findOneAndUpdate(
        {
          stripeAccountId: account.id,
        },
        {
          stripeOnboardingCompleted: onboardingCompleted,

          stripeDetailsSubmitted: account.details_submitted,

          stripeChargesEnabled: account.charges_enabled,

          stripePayoutsEnabled: account.payouts_enabled,

          stripeRequirementsDue: requirementsDue,

          stripeAccountStatus: accountStatus,
        },
      );

      logger.info(
        `[STRIPE] Account updated ${account.id} | status=${accountStatus}`,
      );

      break;
    }

    /**
     * =========================================
     * UNHANDLED EVENTS
     * =========================================
     */

    default: {
      logger.info(`[STRIPE] Unhandled event: ${event.type}`);

      break;
    }
  }
};

export default router;
