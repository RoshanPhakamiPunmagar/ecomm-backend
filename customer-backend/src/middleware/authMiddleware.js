// import { findToken } from "../models/session/SessionSchema.js";
import { getUserByEmail } from "../models/users/userModel.js";
import { verifyAccessJWT, verifyRefreshJWT } from "../utils/jwt.js";

export const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return next({ message: "No Authorization header", status: 403 });
    }

    const token = authorization.split(" ")[1]; // ✅ remove 'Bearer'

    const decoded = verifyAccessJWT(token);

    if (!decoded?.email) {
      return next({ message: "Invalid Token", status: 403 });
    }

    // Optionally check session in DB (tokenObj)
    // const tokenObj = await findToken(token);

    const user = await getUserByEmail(decoded.email);
    if (!user?._id) {
      return next({ message: "User not found", status: 403 });
    }

    user.password = "";
    req.userInfo = user;

    next();
  } catch (error) {
    next(error);
  }
};

export const renewauth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return next({ message: "No Authorization header", status: 403 });
    }

    // Remove "Bearer " prefix
    const token = authorization.split(" ")[1];

    // Verify refresh token
    const decoded = verifyRefreshJWT(token);

    if (!decoded?.email) {
      return next({ message: "Invalid Refresh Token", status: 403 });
    }

    // Optionally, check if token exists in DB/session table
    // const tokenObj = await findToken(token);

    // Get user by email
    const user = await getUserByEmail(decoded.email);

    if (!user?._id) {
      return next({ message: "User not found", status: 403 });
    }

    // Remove sensitive info
    user.password = "";
    req.userInfo = user;

    next();
  } catch (error) {
    next(error);
  }
};
