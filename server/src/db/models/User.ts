import { Schema, model } from "mongoose";

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
    },

    passwordChanged: {
      type: Boolean,
      required: true,
    },

    temporaryPassword: {
      type: String,
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
    },

    onboardingCompleted: {
      type: Boolean,
      default: false,
    },

    chargesEnabled: {
      type: Boolean,
      default: false,
    },

    payoutsEnabled: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: String,
      default: "admin",
      required: true,
    },

    refreshToken: {
      type: String,
      default: null,
    },
  },
  { strict: true, timestamps: true },
);

const User = model("User", userSchema);

export default User;
