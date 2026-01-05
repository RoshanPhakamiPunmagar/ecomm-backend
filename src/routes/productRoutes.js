import express from "express";
import {
  fetchProducts,
  fetchProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", fetchProducts);

//fetch product by its id
router.get("/:id", fetchProductById);

export default router;
