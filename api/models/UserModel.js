import mongoose from "mongoose";

// create user schema

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      trim: true,
      default: null,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      default: null,
    },
    photo: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "user",
    },
    cart: {
      type: Array,
      default: null,
    },
    wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    address: {
      type: String,
      default: null,
      trim: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    trash: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: {
      type: Date,
      default: null,
      trim: true,
    },
    passwordResetToken: {
      type: String,
      default: null,
      trim: true,
    },
    passwordResetExpires: {
      type: Date,
      default: null,
      trim: true,
    },
  },
  { timestamps: true }
);

// export user schema

export default mongoose.models.User || mongoose.model("User", userSchema);
