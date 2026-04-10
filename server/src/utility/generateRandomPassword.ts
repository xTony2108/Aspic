import { randomBytes } from "crypto";

export const generateTempPassword = (): string => {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const special = "!@#$%&*";
  const all = upper + lower + digits + special;

  const rand = (chars: string) => chars[randomBytes(1)[0] % chars.length];

  const required = [rand(upper), rand(lower), rand(digits), rand(special)];

  const rest = Array.from({ length: 8 }, () => rand(all));

  return [...required, ...rest].sort(() => randomBytes(1)[0] - 128).join("");
};
