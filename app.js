// server.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Routers
import authRouter from "./src/routes/authRoutes.js";
import productRouter from "./src/routes/productRoutes.js";
import categoryRouter from "./src/routes/categoryRoutes.js";
import orderRouter from "./src/routes/orderRoutes.js";
import reviewRouter from "./src/routes/reviewRoutes.js";
import paymentRouter from "./src/routes/paymentRoutes.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* =========================
   CORS CONFIG
========================= */
const allowedOrigins = [
  "http://localhost:5173",
  "http://ecomm-fe-bucket.s3-website-us-east-1.amazonaws.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("❌ CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: false,
};

app.use(cors("*"));

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());

// Static files for images, assets
app.use("/public", express.static(path.join(__dirname, "src/assets")));
app.use("/uploads", express.static("uploads"));

/* =========================
   API ROUTES
========================= */
// Health check
app.get("/", (req, res) => {
  res.send("Scalable eCommerce Application Using MERN Stack");
});

app.use("/api/customer/v1/auth", authRouter);
app.use("/api/customer/v1/products", productRouter);
app.use("/api/customer/v1/categories", categoryRouter);
app.use("/api/customer/v1/orders", orderRouter);
app.use("/api/customer/v1/reviews", reviewRouter);
app.use("/payment", paymentRouter);

/* =========================
   GLOBAL ERROR HANDLER
========================= */
app.use((error, req, res, next) => {
  console.error("❌ Error:", error.message);

  if (error.message === "Not allowed by CORS") {
    return res.status(403).json({
      status: "fail",
      message: "CORS policy does not allow this origin",
    });
  }

  res.status(error.status || 500).json({
    status: "error",
    message: error.message || "Internal Server Error",
  });
});

export default app;
