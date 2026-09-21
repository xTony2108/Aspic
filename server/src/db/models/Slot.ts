import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
    match: [/^\d{2}:\d{2}$/, "Formato orario non valido (HH:MM)"],
  },
  status: {
    type: String,
    enum: ["available", "booked", "blocked"],
    default: "available",
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "appointment",
    default: null,
  },
});

const slotSchema = new mongoose.Schema(
  {
    professionalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    date: {
      type: String,
      required: true,
      match: [/^\d{4}-\d{2}-\d{2}$/, "Formato data non valido (YYYY-MM-DD)"],
    },
    slots: {
      type: [timeSlotSchema],
      validate: {
        validator: (arr: any[]) => Array.isArray(arr) && arr.length > 0,
        message: "Devi inserire almeno un orario",
      },
    },
  },
  { timestamps: true },
);

slotSchema.index({ professionalId: 1, date: 1 }, { unique: true });

slotSchema.virtual("availableCount").get(function () {
  return this.slots.filter((s) => s.status === "available").length;
});

slotSchema.set("toJSON", { virtuals: true });
slotSchema.set("toObject", { virtuals: true });

const Slot = mongoose.model("Slot", slotSchema);

export default Slot;
