import Stripe from "stripe";
import { config } from "../config";

export const stripe = Stripe(config.STRIPE_SECRET_KEY);
