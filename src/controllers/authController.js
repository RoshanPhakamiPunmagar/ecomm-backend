import { createNewUser, getUserByEmail } from "../models/users/userModel.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import {
  singAccessJWT,
  singRefresJWT,
  signVerificationJWT,
  verifyVerificationJWT,
} from "../utils/jwt.js";
import { sendVerificationEmail } from "../services/emailService.js";

export const createUser = async (req, res, next) => {
  try {
    // create user

    const userObject = req.body;
    userObject.password = hashPassword(req.body.password);

    const user = await createNewUser(userObject);

    // create verification token
    const verificationToken = signVerificationJWT({
      email: user.email,
    });

    // send verification email
    await sendVerificationEmail(user.email, verificationToken);

    return res.json({
      status: "success",
      message: "User created. Please check your email to verify your account.",
    });
  } catch (error) {
    next(error);
  }
};

//verify userEmail
export const verifyEmail = async (req, res, next) => {
  try {
    const token = decodeURIComponent(req.params.token);
    const decoded = verifyVerificationJWT(token);

    if (!decoded || !decoded.email) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid token" });
    }

    const user = await getUserByEmail(decoded.email);

    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "User not found" });
    }

    user.verified = true;
    await user.save();

    if (!user.verified) {
      return res.status(403).json({
        status: "error",
        message: "Please verify your email first",
      });
    }

    return res.json({
      status: "success",
      message: "Email verified successfully",
    });
  } catch (error) {
    next({ status: 400, message: "Invalid or expired token" });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    // get email from request

    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (user) {
      // compare password
      if (comparePassword(password, user.password)) {
        const payload = { email };
        // access token
        const accessJWT = singAccessJWT(payload);

        // renew token
        const refreshJWT = singRefresJWT(payload);

        // send them as response
        return res
          .cookie("jwt", accessJWT, {
            domain: ".test.com", // note leading dot
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "none", // allow cross-site requests (for cross-origin subdomain calls)
            maxAge: 60 * 60 * 1000,
          })
          .json({
            status: "success",
            message: "User authenticated",
            tokens: {
              accessJWT,
              refreshJWT,
            },
          });
      } else {
        const error = {
          message: "Invalid Credentials",
        };
        next(error);
      }
    } else {
      const error = {
        message: "User not found",
      };
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

// logic to create new access token
export const renewToken = async (req, res, next) => {
  try {
    const payload = { email: req.userInfo.email };
    // access token
    const accessJWT = singAccessJWT(payload);

    return res.json({
      status: "success",
      message: "User authenticated",
      tokens: {
        accessJWT,
      },
    });
  } catch (error) {
    next(error);
  }
};
