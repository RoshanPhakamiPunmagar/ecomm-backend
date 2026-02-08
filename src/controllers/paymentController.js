import stripe from "../config/stripe.js";
import config from "../config/config.js";

export const createPaymentIntent = async (req, res, next) => {
  try {
    const { amount } = req.body; // amount in cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "aud",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        userId: req.userInfo._id.toString(),
      },
    });

    res.json({
      status: "success",
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(error);
  }
};

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

export const getStripeConfig = (req, res) => {
  res.json({
    publishableKey: config.stripe.publicKey,
  });
};
