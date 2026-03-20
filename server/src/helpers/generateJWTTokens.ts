import jwt from "jsonwebtoken";

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

if (!JWT_SECRET || !JWT_REFRESH_SECRET)
  throw new Error(
    "Variabile d'ambiente JWT_SECRET o JWT_REFRESH_SECRET non definita",
  );

interface TokenPayload {
  _id: string;
}

export const generateAccessToken = (payload: TokenPayload) => {
  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "15m",
    subject: payload._id.toString(),
  });

  return accessToken;
};

export const generateRefreshToken = (payload: TokenPayload) => {
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
    subject: payload._id.toString(),
  });

  return refreshToken;
};
