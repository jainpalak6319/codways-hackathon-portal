import jwt from "jsonwebtoken";
import env from "../config/env.js";

/**
 * Login JWT
 */
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_EXPIRES_IN,
    }
  );
};

/**
 * Forgot Password JWT
 */
export const generateResetToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    env.RESET_PASSWORD_SECRET,
    {
      expiresIn: env.RESET_PASSWORD_EXPIRES,
    }
  );
};

/**
 * Verify Forgot Password JWT
 */
export const verifyResetToken = (token) => {
  return jwt.verify(
    token,
    env.RESET_PASSWORD_SECRET
  );
};