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
        "pending", // prenotazione ricevuta, in attesa conferma professionista
        "awaiting_payment", // confermata, link pagamento inviato al cliente
        "paid", // pagamento completato, appuntamento in carico
        "confirmed", // (opzionale) conferma post-pagamento manuale
        "cancelled", // cancellato (prima del pagamento)
        "refunded", // cancellato dopo pagamento → rimborso emesso
        "completed", // appuntamento svolto
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
    },
    stripe: {
      sessionId: { type: String }, // checkout.session.id
      paymentIntentId: { type: String }, // per emettere il refund
      amountPaid: { type: Number }, // in centesimi, da Stripe (source of truth)
      paidAt: { type: Date },
      refundId: { type: String }, // stripe refund id
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
