import { stripe } from "./stripe.js";

export const createStripeAccount = async (email: string) => {
  return stripe.accounts.create({
    type: "express",
    country: "IT",
    email,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });
};
