import express from "express";
import {
  submitReview,
  getProductReviews,
} from "../controllers/reviewController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Submit review
router.post("/", auth, submitReview);

// Get reviews of a product
router.get("/:productId", getProductReviews);

export default router;
