import express from "express";
import { placeOrder, getMyOrders } from "../controllers/orderController.js";
import { auth } from "../middleware/authMiddleware.js";
import { isCustomer } from "../middleware/roleMiddleware.js";

const router = express.Router();

// must be logged in
router.post("/", auth, placeOrder);
router.get("/", auth, getMyOrders);

export default router;
