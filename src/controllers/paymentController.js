// src/controllers/paymentController.js
import stripe from "../config/stripe.js";
import config from "../config/config.js";

// Create a PaymentIntent
export const createPaymentIntent = async (req, res, next) => {
  try {
    // Ensure body exists
    const { amount } = req.body || {};
    if (!amount)
      return res
        .status(400)
        .json({ status: "error", message: "Amount is required" });

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "aud",
      automatic_payment_methods: { enabled: true },
      metadata: { userId: req.userInfo._id.toString() },
    });

    res.json({ status: "success", clientSecret: paymentIntent.client_secret });
  } catch (error) {
    next(error);
  }
};

// Handle Stripe Webhook
export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      config.stripe.webhookSecret,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle events
  switch (event.type) {
    case "payment_intent.succeeded":
      console.log("Payment successful:", event.data.object.id);
      break;
    case "payment_intent.payment_failed":
      console.log("Payment failed:", event.data.object.id);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

// Return publishable Stripe key
export const getStripeConfig = (req, res) => {
  res.json({ publishableKey: config.stripe.publicKey });
};
