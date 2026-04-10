import { stripe } from "./stripe";

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
