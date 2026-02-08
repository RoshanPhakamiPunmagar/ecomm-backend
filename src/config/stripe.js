import Stripe from "stripe";
import config from "./config.js";

const stripe = new Stripe(config.stripe.secretKey);

export default stripe;
