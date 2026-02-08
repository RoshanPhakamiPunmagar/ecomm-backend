import express from "express";
import {
  submitReview,
  getProductReviews,
} from "../controllers/reviewController.js";
import { auth } from "../middleware/authMiddleware.js";
import { isCustomer } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Submit review
router.post("/", auth, isCustomer, submitReview);

// Get reviews of a product
router.get("/:productId", isCustomer, getProductReviews);

export default router;
