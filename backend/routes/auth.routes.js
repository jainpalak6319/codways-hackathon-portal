import express from "express";
import { signup,login,logout,me,githubCallback } from "../controllers/auth.controller.js";
import passport from "passport";
import { googleCallback } from "../controllers/auth.controller.js";
import {
  signupValidator,
  loginValidator,
  validate,
} from "../validators/auth.validator.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Signup
router.post("/signup", signupValidator, validate, signup);
router.post("/login", loginValidator, validate, login);
router.post("/logout", protect, logout);
router.get("/me", protect, me);
// Redirect user to Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google redirects here after login
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login",
  }),
  googleCallback
);
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

router.get("/github", (req, res) => {
  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.GITHUB_CALLBACK_URL)}&scope=user:email`;
  res.redirect(redirectUrl);
});

router.get("/github/callback", githubCallback);
export default router;