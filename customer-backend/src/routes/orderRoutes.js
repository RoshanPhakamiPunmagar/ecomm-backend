import express from "express";
import { placeOrder, getMyOrders } from "../controllers/orderController.js";
import { auth } from "../middleware/authMiddleware.js";
import { isCustomer } from "../middleware/roleMiddleware.js";

const router = express.Router();

// must be logged in
router.post("/", auth, isCustomer, placeOrder);
router.get("/", auth, isCustomer, getMyOrders);

export default router;
