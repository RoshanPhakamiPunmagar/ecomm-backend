import express from "express";
import {
  createPaymentIntent,
  stripeWebhook,
  getStripeConfig,
} from "../controllers/paymentController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Stripe webhook uses raw body
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook,
);

// ✅ Create PaymentIntent (JSON body, auth required)
router.post("/intent", auth, createPaymentIntent);

// ✅ Return Stripe publishable key
router.get("/config", getStripeConfig);

export default router;
