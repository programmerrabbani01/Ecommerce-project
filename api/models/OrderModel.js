import mongoose from "mongoose";

// create order schema

const orderSchema = mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: "Not In Process",
      enum: [
        "Not In Process",
        "Cash On Delivery",
        "processing",
        "Completed",
        "Cancelled",
      ],
    },
    orderBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// export default order schema

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
