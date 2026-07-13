import User from "../models/User.js";
import {
  registerUser,
  loginUser,
  googleLogin,
  forgotPassword,
  getCurrentUser,
  resetPassword,
} from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import axios from "axios";

/**
 * Register User
 * POST /api/auth/signup
 */
export const signup = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

   return res
  .status(201)
  .json(new ApiResponse(201, "User registered successfully.", user));
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const { token, user } = await loginUser(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
  .status(200)
  .json(new ApiResponse(200, "Login successful.", user));
  } catch (error) {
    next(error);
  }
};
export const googleCallback = async (req, res, next) => {
  try {
    const { token } = await googleLogin(req.user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    let redirectUrl = "http://localhost:5173";

switch (req.user.role) {
  case "admin":
    redirectUrl = "http://localhost:5173/admin/dashboard";
    break;

  case "judge":
    redirectUrl = "http://localhost:5173/judge/dashboard";
    break;

  default:
    redirectUrl = "http://localhost:5173/participant/dashboard";
}

return res.redirect(redirectUrl);
  } catch (error) {
    next(error);
  }
};


export const githubCallback = async (req, res, next) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.redirect("http://localhost:5173/login");
    }

    // Step 1: Exchange code for access token
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: process.env.GITHUB_CALLBACK_URL,
      },
      { headers: { Accept: "application/json" } }
    );

    // console.log("RAW GITHUB TOKEN RESPONSE:", tokenResponse.data);

    const { access_token, error, error_description } = tokenResponse.data;

    if (!access_token) {
      console.log("GitHub token exchange failed:", error, error_description);
      return res.status(401).json({
        success: false,
        error,
        error_description,
      });
    }

    // Step 2: Fetch GitHub profile
    const profileResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `token ${access_token}` },
    });

    let email = profileResponse.data.email;

    // Step 3: Fetch email separately if not public
    if (!email) {
      const emailsResponse = await axios.get("https://api.github.com/user/emails", {
        headers: { Authorization: `token ${access_token}` },
      });
      const primaryEmail = emailsResponse.data.find((e) => e.primary && e.verified);
      email = primaryEmail?.email;
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "GitHub account has no public/verified email. Please add one to GitHub.",
      });
    }

    // Step 4: Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        fullName: profileResponse.data.name || profileResponse.data.login,
        email,
        provider: "github",
        githubId: String(profileResponse.data.id),
        avatar: profileResponse.data.avatar_url || "",
        isVerified: true,
      });
    }

    // Step 5: Reuse your existing login token/cookie logic
    const { token } = await googleLogin(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    let redirectUrl = "http://localhost:5173";
    switch (user.role) {
      case "admin":
        redirectUrl = "http://localhost:5173/admin/dashboard";
        break;
      case "judge":
        redirectUrl = "http://localhost:5173/judge/dashboard";
        break;
      default:
        redirectUrl = "http://localhost:5173/participant/dashboard";
    }

    return res.redirect(redirectUrl);
  } catch (error) {
    console.log("GitHub callback error:", error.response?.data || error.message);
    next(error);
  }
};
/**
 * Forgot Password
 */
export const forgotPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;

    const result = await forgotPassword(email);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Reset Password
 */
export const resetPasswordController = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const result = await resetPassword(token, password);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};
export const me = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.user._id);

   return res
  .status(200)
  .json(new ApiResponse(200, "User fetched successfully.", user));
  } catch (error) {
    next(error);
  }
};
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Logged out successfully."));
};