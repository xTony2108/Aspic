import crypto from "crypto";
import bcrypt from "bcrypt";
import Appointment from "../db/models/Appointment.js";
import RefreshToken from "../db/models/RefreshToken.js";
import User from "../db/models/User.js";
import { getServiceLabel } from "../utility/getLabels.js";
import { stripe } from "../lib/stripe/stripe.js";
import { StripeAppointmentInfoParams } from "../types/StripeAppointmentInfoParams.js";
import { config } from "../config.js";

export const getActiveSessionsService = async (userID: string) => {
  return RefreshToken.find(
    { user_id: userID, expires_at: { $gt: new Date() } },
    "device_info jti createdAt",
    {
      lean: true,
    },
  );
};

export const findAppointmentByID = async (appointmentID: string) => {
  return await Appointment.findById(appointmentID, "", { lean: true });
};

export const updateAppointmentStatus = async (
  searchFields: Record<string, unknown>,
  updateFields: Record<string, unknown>,
) => {
  return Appointment.findOneAndUpdate(searchFields, updateFields);
};

export const updateAppointmentDate = async (
  appointmentID: string,
  searchFields: Record<string, unknown>,
  updateFields: Record<string, unknown>,
) => {
  const token = crypto.randomBytes(32).toString("hex");

  await Appointment.findByIdAndUpdate(appointmentID, {
    pendingDateChange: {
      ...updateFields,
      token,
      expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
    },
  });

  return Appointment.findOneAndUpdate(searchFields, updateFields);
};

export const changePasswordService = async (
  userID: string,
  password: string,
) => {
  const newHashedPassword = await bcrypt.hash(password, 12);

  await User.findByIdAndUpdate(userID, {
    password: newHashedPassword,
    passwordChanged: true,
  });
};

export const findUserByIDService = async (userId: string) => {
  return User.findById(
    userId,
    "_id email firstName lastName phoneNumber password passwordChanged onboardingCompleted",
    { lean: true },
  );
};

export const updateUserDataService = async (
  userID: string,
  data: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  },
) => {
  return User.findByIdAndUpdate(userID, data);
};

export const createStripeSession = async ({
  service,
  price,
  date,
  time,
  appointmentID,
  professionalID,
  stripeAccountId,
  clientEmail,
}: StripeAppointmentInfoParams) => {
  const CLIENT_URL = config.ORIGIN;

  const session = await stripe.checkout.sessions.create(
    {
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: clientEmail,
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: price,
            product_data: {
              name: getServiceLabel(service),
              description: `${date.toLocaleDateString("it-IT")} alle ${time}`,
            },
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "eur",
            unit_amount: 200,
            product_data: {
              name: "Imposta di bollo",
              description: "€2,00 (art. 13 Tariffa DPR 642/1972)",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        appointmentId: appointmentID.toString(),
        professionalId: professionalID.toString(),
      },
      success_url: `${CLIENT_URL}/appuntamento/successo?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_URL}/appuntamento/annullata`,
      expires_at: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    },
    { stripeAccount: stripeAccountId },
  );

  return session;
};

export const deleteSessionByID = async (jti: string, userID: string) => {
  return RefreshToken.findOneAndDelete({ jti, user_id: userID });
};
