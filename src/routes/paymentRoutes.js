import express from "express";
import {
  createPaymentIntent,
  stripeWebhook,
  getStripeConfig,
} from "../controllers/paymentController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// create payment intent (needs auth)
router.post("/intent", auth, createPaymentIntent);

// webhook (NO auth, NO json)
router.post("/webhook", stripeWebhook);

// public config
router.get("/config", getStripeConfig);

export default router;
