import { Schema, model } from "mongoose";

export const appointmentSchema = new Schema(
  {
    service: {
      type: String,
      required: true,
      enum: ["consulenza-psicologica", "valutazione-psicodiagnostica"],
    },
    price: {
      type: Number,
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
    },
    appointmentMode: {
      type: String,
      required: true,
      enum: ["online", "in_person"],
    },
    urgent: {
      type: Boolean,
      required: true,
    },
    clientType: {
      type: String,
      required: true,
      enum: ["bambini", "adulti", "anziani"],
    },
    clientAge: {
      type: String || undefined,
    },
    reason: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    birthPlace: {
      type: String,
      required: true,
    },
    fiscalCode: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    privacyAccepted: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
      enum: [
        "pending",
        "awaiting_payment",
        "date_change_pending",
        "confirmed",
        "cancelled",
        "refunded",
        "payment_failed",
        "completed",
      ],
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    protocolNumber: {
      type: String,
      required: true,
      unique: true,
    },
    pendingDateChange: {
      newDate: Date,
      newTime: String,
      token: String,
      expiresAt: Date,
      previousStatus: String,
    },
    stripe: {
      sessionId: { type: String },
      paymentIntentId: { type: String },
      amountPaid: { type: Number },
      paidAt: { type: Date },
      refundId: { type: String },
      refundedAt: { type: Date },
      default: {},
    },
    cancellation: {
      token: { type: String },
      expiresAt: { type: Date },
      default: {},
    },
  },
  { strict: true },
);

const Appointment = model("Appointment", appointmentSchema);

export default Appointment;
