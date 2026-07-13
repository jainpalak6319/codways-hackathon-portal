import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    // ==========================================
    // ORIGINAL AUTHENTICATION FIELDS
    // ==========================================
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [3, "Full name must be at least 3 characters"],
      maxlength: [50, "Full name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === "local";
      },
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["participant", "judge", "admin"],
      default: "participant",
    },
    status: {
      type: String,
      enum: ["active", "pending", "approved", "rejected"],
      default: function () {
        return this.role === "judge" ? "pending" : "active";
      },
    },
    provider: {
      type: String,
      enum: ["local", "google", "github"],
      default: "local",
    },
    googleId: {
      type: String,
      default: "",
    },
    githubId: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    // ==========================================
    // NEW HACKATHON & MATCHMAKING FIELDS
    // ==========================================
    college: { 
      type: String 
    },
    course: { 
      type: String 
    },
    location: { 
      type: String 
    },
    participationType: { 
      type: String, 
      enum: ['LEADER', 'MEMBER', 'SOLO', 'NONE'], 
      default: 'NONE' 
    },
    skills: [{ 
      type: String 
    }],
    
    // Arrays to support multiple hackathons for a single user
    registeredHackathons: [{ 
      type: String 
    }],
    teams: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Team' 
    }]
  },
  {
    timestamps: true,
  }
);

/**
 * Hash password before saving
 */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Compare entered password with hashed password
 */
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;