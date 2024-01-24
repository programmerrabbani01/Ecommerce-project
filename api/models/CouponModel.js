import mongoose from "mongoose";

// create coupon schema

const couponSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      uppercase: true,
    },
    expire: {
      type: Date,
      required: true,
      trim: true,
    },
    discount: {
      type: Number,
      required: true,
      trim: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// export coupon schema

export default mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);
