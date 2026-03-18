import express from "express";
import {
  createUser,
  loginUser,
  renewToken,
  verifyEmail,
} from "../controllers/authController.js";
import {
  loginValidation,
  newUserValidation,
} from "../middleware/joiValidation.js";
import { auth, renewauth } from "../middleware/authMiddleware.js";
import { fetchUserDetail } from "../controllers/userController.js";

const router = express.Router();

// api/v1/auth/register
router.post("/signup", newUserValidation, createUser);

// api/v1/auth/login
router.post("/login", loginValidation, loginUser);

// api/v1/auth/renew-jwt
// renew token authenticator
router.get("/verify/:token", verifyEmail);

router.post("/refresh-token", renewauth, renewToken);
// api/v1/auth/users
router.get("/users", auth, fetchUserDetail);

export default router;
