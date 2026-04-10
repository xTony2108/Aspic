import { createHash } from "crypto";
import User from "../db/models/User";
import bcrypt from "bcrypt";
import { UAParser } from "ua-parser-js";
import RefreshToken from "../db/models/RefreshToken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utility/generateJWTTokens";
import { generateTempPassword } from "../utility/generateRandomPassword";
import crypto from "crypto";
import Appointment from "../db/models/Appointment";
import mongoose from "mongoose";
import { stripe } from "../lib/stripe/stripe";
import { getServiceLabel } from "../utility/getLabels";
import { config } from "../config";
import { StripeAppointmentInfoParams } from "../types/StripeAppointmentInfoParams";
import { createStripeAccount } from "../lib/stripe/createStripeAccount";

export const findUserByEmailService = async (email: string) => {
  return User.findOne(
    { email },
    "_id firstName lastName email password emailVerified emailVerificationToken emailVerificationExpires passwordChanged",
    {
      lean: true,
    },
  );
};

export const comparePasswordService = async (
  password: string,
  hashedPW: string,
) => {
  return bcrypt.compare(password, hashedPW);
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
  createdBy: string;
}
export const createUserService = async (data: RegisterTypeSchema) => {
  const generatedPw = generateTempPassword();
  const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 ore
  const hashedPw = await bcrypt.hash(generatedPw, 12);
  const emailVerificationToken = crypto.randomBytes(32).toString("hex");

  const stripeAccount = await createStripeAccount(data.email);

  const user = await User.create({
    ...data,
    password: hashedPw,
    passwordChanged: false,
    emailVerified: false,
    emailVerificationToken,
    emailVerificationExpires,
    stripeAccountId: stripeAccount.id,
  });

  return { id: user._id, generatedPw, emailVerificationToken };
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
  const { SALT_ROUNDS } = process.env;

  const emailVerificationToken = crypto.randomBytes(32).toString("hex");
  const emailVerificationExpires = new Date(Date.now() + 1000 * 60 * 60 * 24);

  const generatedPw = generateTempPassword();
  const hashedPw = await bcrypt.hash(generatedPw, Number(SALT_ROUNDS));

  await User.updateOne(
    { emailVerificationToken: token },
    {
      emailVerificationToken,
      emailVerificationExpires,
      password: hashedPw,
    },
  );

  return { generatedPw, emailVerificationToken };
};

export const findUserByIDService = async (userId: string) => {
  return User.findById(
    userId,
    "-_id email firstName lastName phoneNumber password passwordChanged",
    { lean: true },
  );
};

export const paginateAppointmentsService = async (
  userID: string,
  page: number,
  limit: number,
  status: string,
) => {
  const offset = (page - 1) * limit;
  const matchCondition = {
    $or: [
      { status: "pending" },
      { status: "cancelled" },
      {
        status: { $nin: ["pending", "cancelled"] },
        assignedTo: new mongoose.Types.ObjectId(userID),
      },
    ],
  };

  const [appointments, currentTotal, statusCounts] = await Promise.all([
    Appointment.find(
      status === "pending" || status === "cancelled"
        ? { status }
        : { status, assignedTo: userID },
      "_id firstName lastName appointmentDate appointmentTime urgent status service clientType clientAge email phoneNumber createdAt protocolNumber reason",
      { lean: true, skip: offset, limit, sort: { appointmentDate: 1 } },
    ),
    Appointment.countDocuments({ status }),
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

export const deleteSessionByID = async (jti: string, userID: string) => {
  return RefreshToken.findOneAndDelete({ jti, user_id: userID });
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
  return await Appointment.findById(appointmentID);
};

export const updateAppointmentStatus = async (
  searchFields: Record<string, unknown>,
  updateFields: Record<string, unknown>,
) => {
  return Appointment.findOneAndUpdate(searchFields, updateFields);
};

export const createStripeSession = async ({
  service,
  date,
  time,
  _id,
  stripeAccountId,
}: StripeAppointmentInfoParams) => {
  const CLIENT_URL =
    config.NODE_ENV === "development"
      ? config.ORIGIN_DEV.split(",")[0]
      : config.ORIGIN;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "eur",
          unit_amount: 8000,
          product_data: {
            name: getServiceLabel(service),
            description: `${date.toLocaleDateString("it-IT")} alle ${time}`,
          },
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      transfer_data: {
        destination: stripeAccountId,
      },
    },
    metadata: {
      appointmentId: _id.toString(),
    },
    success_url: `${CLIENT_URL}/appuntamento/successo?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${CLIENT_URL}/appuntamento/annullata`,
    expires_at: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
  });

  return session;
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

export const findUsers = async () => {
  return User.find({}, "_id email firstName lastName fiscalCode phoneNumber", {
    lean: true,
  });
};
