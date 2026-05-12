import { createHash } from "crypto";
import User from "../db/models/User.js";
import bcrypt from "bcrypt";
import { UAParser } from "ua-parser-js";
import RefreshToken from "../db/models/RefreshToken.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utility/generateJWTTokens.js";
import crypto from "crypto";
import Appointment from "../db/models/Appointment.js";
import mongoose from "mongoose";
import { stripe } from "../lib/stripe/stripe.js";
import { config } from "../config.js";
import { createStripeAccount } from "../lib/stripe/createStripeAccount.js";
import { sendEmail } from "../emails/sendEmail.js";
import { createElement } from "react";
import { VerifyEmail } from "../emails/templates/VerifyEmail.js";
import { logger } from "../logger.js";

export const findUserByEmailService = async (email: string) => {
  return User.findOne(
    { email },
    "_id firstName lastName email password emailVerified emailVerificationToken emailVerificationExpires passwordChanged",
    {
      lean: true,
    },
  );
};

export const createRefreshTokenService = async (
  jti: string,
  userID: string,
  userAgent: string,
  ip: string,
) => {
  const refreshToken = generateRefreshToken({
    _id: userID,
    jti,
  });

  const hashedRefresh = createHash("sha256").update(refreshToken).digest("hex");

  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  const deviceName = `${result.browser.name || "Unknown"} on ${
    result.os.name || "Unknown"
  }`;

  await RefreshToken.create({
    jti,
    refresh_token_hash: hashedRefresh,
    device_info: {
      device_name: deviceName,
      ip,
      user_agent: userAgent,
    },
    user_id: userID,
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return refreshToken;
};

export const logoutAllService = async (userID: string, jti: string) => {
  return RefreshToken.deleteMany({
    user_id: userID,
    jti: { $ne: jti },
  });
};

export const logoutService = async (jti: string) => {
  return RefreshToken.findOneAndDelete({ jti });
};

export const refreshTokenService = async (
  refreshToken: string,
  decoded: { _id: string; jti: string },
) => {
  const tokenRecord = await RefreshToken.findOne(
    { jti: decoded.jti, expires_at: { $gt: new Date() } },
    "refresh_token_hash",
    { lean: true },
  );

  if (!tokenRecord) throw new Error("TOKEN_NOT_FOUND");

  const hashedToken = createHash("sha256").update(refreshToken).digest("hex");

  if (tokenRecord.refresh_token_hash !== hashedToken)
    throw new Error("TOKEN_NOT_VALID");

  return generateAccessToken({
    _id: decoded._id,
    jti: decoded.jti,
  });
};

interface RegisterTypeSchema {
  firstName: string;
  lastName: string;
  fiscalCode: string;
  email: string;
  phoneNumber: string;
  createdBy: string;
}
export const createUserService = async (data: RegisterTypeSchema) => {
  const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 ore
  const initialPassword = crypto.randomBytes(32).toString("hex");
  const hashedPw = await bcrypt.hash(initialPassword, 12);
  const emailVerificationToken = crypto.randomBytes(32).toString("hex");

  const stripeAccount = await createStripeAccount(data.email);

  let user;
  try {
    user = await User.create({
      ...data,
      password: hashedPw,
      passwordChanged: false,
      emailVerified: false,
      emailVerificationToken,
      emailVerificationExpires,
      stripeAccountId: stripeAccount.id,
    });
  } catch (dbError) {
    await stripe.accounts.del(stripeAccount.id);
    throw dbError;
  }
  logger.info(`[REGISTER] User created: ${user._id} - ${user.email}`);

  try {
    // Invio mail di verifica
    const verificationUrl =
      config.NODE_ENV === "development"
        ? `http://localhost:5173/admin/verifica?token=${emailVerificationToken}`
        : `${config.ORIGIN}/admin/verifica?token=${emailVerificationToken}`;

    await sendEmail(
      "Verifica il tuo indirizzo email",
      createElement(VerifyEmail, {
        firstName: data.firstName,
        lastName: data.lastName,
        createdByName: data.createdBy,
        verificationUrl,
        expiresInHours: 24,
        email: data.email,
      }),
      data.email,
    );
  } catch (emailError) {
    await stripe.accounts.del(stripeAccount.id);
    await user.deleteOne();
    throw emailError;
  }

  logger.info(`[REGISTER] Verification email sent to: ${data.email}`);
  return { id: user._id };
};

export const findEmailTokenService = async (token: string) => {
  return User.findOne(
    { emailVerificationToken: token },
    "firstName lastName createdBy email emailVerified emailVerificationExpires",
    { lean: true },
  );
};

export const confirmEmailService = (token: string) => {
  return User.updateOne(
    { emailVerificationToken: token },
    {
      emailVerificationToken: null,
      emailVerificationExpires: null,
      emailVerified: true,
      emailVerifiedAt: new Date(),
    },
  );
};

export const generateNewEmailToken = async (token: string) => {
  const emailVerificationToken = crypto.randomBytes(32).toString("hex");
  const emailVerificationExpires = new Date(Date.now() + 1000 * 60 * 60 * 24);

  await User.updateOne(
    { emailVerificationToken: token },
    {
      emailVerificationToken,
      emailVerificationExpires,
    },
  );

  return { emailVerificationToken };
};

export const activateAccountService = async (
  token: string,
  password: string,
) => {
  const hashedPw = await bcrypt.hash(password, 12);

  return User.updateOne(
    { emailVerificationToken: token },
    {
      emailVerificationToken: null,
      emailVerificationExpires: null,
      emailVerified: true,
      emailVerifiedAt: new Date(),
      password: hashedPw,
      passwordChanged: true,
    },
  );
};

export const paginateAppointmentsService = async (
  userID: string,
  page: number,
  limit: number,
  status:
    | "pending"
    | "cancelled"
    | "awaiting_payment"
    | "date_change_pending"
    | "confirmed"
    | "payment_failed"
    | "refunded"
    | "completed",
) => {
  const offset = (page - 1) * limit;
  const isSharedStatus =
    status === "pending" ||
    status === "cancelled" ||
    status === "date_change_pending";

  const listFilter = isSharedStatus
    ? { status }
    : { status, assignedTo: userID };
  const matchCondition = {
    $or: [
      { status: "pending" },
      { status: "cancelled" },
      { status: "date_change_pending" },
      {
        status: { $nin: ["pending", "cancelled", "date_change_pending"] },
        assignedTo: new mongoose.Types.ObjectId(userID),
      },
    ],
  };

  const [appointments, currentTotal, statusCounts] = await Promise.all([
    Appointment.find(
      listFilter,
      "_id firstName lastName appointmentDate appointmentTime appointmentMode urgent status service clientType clientAge email phoneNumber createdAt protocolNumber reason",
      { lean: true, skip: offset, limit, sort: { appointmentDate: 1 } },
    ),
    Appointment.countDocuments(listFilter),
    Appointment.aggregate([
      {
        $match: matchCondition,
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          status: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]),
  ]);

  const counts: { [key: string]: number } = {
    pending: 0,
    awaiting_payment: 0,
    date_change_pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  };

  statusCounts.forEach((item: { status: string; count: number }) => {
    counts[item.status] = item.count;
  });

  const totalPages = Math.ceil(currentTotal / limit);
  return { appointments, totalPages, counts };
};

export const findUsers = async (userID: string) => {
  return User.aggregate([
    {
      $match: {
        status: { $ne: "deleted" },
      },
    },
    {
      $addFields: {
        priority: {
          $cond: [{ $eq: ["$_id", new mongoose.Types.ObjectId(userID)] }, 0, 1],
        },
      },
    },
    {
      $sort: {
        priority: 1,
      },
    },
    {
      $project: {
        _id: 1,
        email: 1,
        firstName: 1,
        lastName: 1,
        fiscalCode: 1,
        phoneNumber: 1,
        createdBy: 1,
      },
    },
  ]);
};

export const comparePasswordService = async (
  password: string,
  hashedPW: string,
) => {
  return bcrypt.compare(password, hashedPW);
};

export const getStripeOnboardingLinkService = async (
  userId: mongoose.Types.ObjectId,
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("Utente non trovato");
  }

  if (user.createdBy?.toLowerCase() === "system") {
    return {
      onboardingCompleted: true,
      url: null,
    };
  }

  if (!user.stripeAccountId) {
    throw new Error("Stripe account non configurato");
  }

  const account = await stripe.accounts.retrieve(user.stripeAccountId);

  const onboardingCompleted =
    account.details_submitted && account.charges_enabled;

  const payoutsEnabled = account.payouts_enabled;

  const requirementsDue = account.requirements?.currently_due || [];

  let status: "pending" | "restricted" | "active" = "pending";

  if (account.charges_enabled && account.payouts_enabled) {
    status = "active";
  } else if (requirementsDue.length > 0) {
    status = "restricted";
  }

  // sync DB
  user.stripeOnboardingCompleted = onboardingCompleted;
  user.stripeChargesEnabled = account.charges_enabled;
  user.stripePayoutsEnabled = payoutsEnabled;
  user.stripeRequirementsDue = requirementsDue;
  user.stripeAccountStatus = status;

  await user.save();

  // account fully active
  if (onboardingCompleted) {
    return {
      onboardingCompleted: true,
      url: null,
      status,
    };
  }

  // create onboarding link
  const accountLink = await stripe.accountLinks.create({
    account: user.stripeAccountId,
    refresh_url: `${config.ORIGIN}/dashboard/impostazioni`,
    return_url: `${config.ORIGIN}/dashboard/stripe-callback`,
    type: "account_onboarding",
  });

  return {
    onboardingCompleted: false,
    url: accountLink.url,
    status,
    requirementsDue,
  };
};
