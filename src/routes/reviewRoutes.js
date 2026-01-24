import express from "express";
import {
  submitReview,
  getProductReviews,
} from "../controllers/reviewController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Submit review
router.post("/customer/v1/reviews", authMiddleware, submitReview);

// Get reviews of a product
router.get("/customer/v1/reviews/:productId", getProductReviews);

export default router;
