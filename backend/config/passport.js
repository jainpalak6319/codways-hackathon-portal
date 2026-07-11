// config/passport.js

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/User.js";
import env from "./env.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await User.findOne({ email });

        // Existing user
        if (user) {
          return done(null, user);
        }

        // New user
        user = await User.create({
          fullName: profile.displayName,
          email,
          provider: "google",
          avatar: profile.photos[0]?.value || "",
          isVerified: true,
        });

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ["user:email"],
    },

    async (accessToken, refreshToken, profile, done) => {
        console.log("GitHub verify callback reached");
      try {
        let email = null;

        // GitHub sometimes doesn't return email directly
        if (profile.emails && profile.emails.length > 0) {
          email = profile.emails[0].value;
        }

        if (!email) {
          return done(
            new Error(
              "GitHub account does not have a public email. Please add a verified email to GitHub."
            ),
            null
          );
        }

        let user = await User.findOne({ email });

        if (user) {
          return done(null, user);
        }

        user = await User.create({
          fullName: profile.displayName || profile.username,
          email,
          provider: "github",
          avatar: profile.photos?.[0]?.value || "",
          isVerified: true,
        });

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);

  done(null, user);
});