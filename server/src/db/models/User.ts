import { Schema, model } from "mongoose";

export type UserRole = "admin" | "professional";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
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
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    passwordChanged: {
      type: Boolean,
      required: true,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationToken: {
      type: String,
    },

    emailVerificationExpires: {
      type: Date,
    },

    emailVerifiedAt: {
      type: Date,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    stripeAccountId: {
      type: String,
      required: false,
      index: true,
    },

    stripeOnboardingCompleted: {
      type: Boolean,
      default: false,
    },

    stripeDetailsSubmitted: {
      type: Boolean,
      default: false,
    },

    stripeChargesEnabled: {
      type: Boolean,
      default: false,
    },

    stripePayoutsEnabled: {
      type: Boolean,
      default: false,
    },

    stripeRequirementsDue: {
      type: [String],
      default: [],
    },

    stripeAccountStatus: {
      type: String,
      enum: ["pending", "restricted", "active"],
      default: "pending",
    },

    role: {
      type: String,
      enum: ["admin", "professional"],
      default: "professional",
      required: true,
    },

    createdBy: {
      type: String,
      default: "admin",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "deleted"],
      default: "active",
    },
    deletedAt: {
      type: Date,
    },
  },
  { strict: true, timestamps: true },
);

const User = model("User", userSchema);

export default User;
