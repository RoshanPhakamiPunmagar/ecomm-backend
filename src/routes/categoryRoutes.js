import express from "express";
import { fetchCategories } from "../controllers/categoryController.js";
import { isCustomer } from "../middleware/roleMiddleware.js";

const router = express.Router();

// GET /api/customer/v1/categories
router.get("/", fetchCategories);

export default router;
