import { Schema, model } from "mongoose";

const appointmentSchema = new Schema(
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
      enum: ["pending", "confirmed", "cancelled", "completed"],
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
    },
  },
  { strict: true },
);

const Appointment = model("Appointment", appointmentSchema);

export default Appointment;
