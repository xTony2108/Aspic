import { Schema, model, Types } from "mongoose";

const refreshTokenSchema = new Schema(
  {
    user_id: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },

    refresh_token_hash: {
      type: String,
      required: true,
      unique: true,
    },

    jti: {
      type: String,
      required: true,
      unique: true,
    },

    device_info: {
      device_name: String,
      ip: String,
      user_agent: String,
    },

    expires_at: {
      type: Date,
      required: true,
    },
  },
  { strict: true, timestamps: true },
);

refreshTokenSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

const RefreshToken = model("RefreshToken", refreshTokenSchema);

export default RefreshToken;
