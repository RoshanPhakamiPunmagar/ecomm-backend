// app.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// // Routers
import authRouter from "./src/routes/authRoutes.js";

import productRouter from "./src/routes/productRoutes.js";

import categoryRouter from "./src/routes/categoryRoutes.js";

import orderRouter from "./src/routes/orderRoutes.js";

import reviewRouter from "./src/routes/reviewRoutes.js";

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(express.json());
app.use(cors());

// Health check
app.get("/", (req, res) => {
  res.send("Scalable eCommerce Application Using MERN Stack");
});

// Static files
app.use("/public", express.static(path.join(__dirname, "src/assets")));

// Routes
app.use("/api/customer/v1/auth", authRouter);

app.use("/api/customer/v1/products", productRouter);

app.use("/api/customer/v1/categories", categoryRouter);

app.use("/api/customer/v1/orders", orderRouter);

app.use("/api/customer/v1/reviews", reviewRouter);

// Global error handler
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.status || 500).json({
    status: "error",
    message: error.message || "Internal Server Error",
  });
});

export default app;
