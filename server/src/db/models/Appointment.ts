import { Schema, model } from "mongoose";

const appointmentSchema = new Schema(
  {
    service: {
      type: String,
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
    urgent: {
      type: Boolean,
      required: true,
    },
    clientType: {
      type: String,
      required: true,
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
  },
  { strict: true },
);

const Appointment = model("Appointment", appointmentSchema);

export default Appointment;
