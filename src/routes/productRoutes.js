import express from "express";
import {
  fetchProducts,
  fetchProductById,
} from "../controllers/productController.js";
import { isCustomer } from "../middleware/roleMiddleware.js";
const router = express.Router();

router.get("/", fetchProducts);

//fetch product by its id
router.get("/:id", fetchProductById);

export default router;
