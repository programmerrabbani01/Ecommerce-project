import mongoose from "mongoose";

// create product schema

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      trim: true,
    },
    regularPrice: {
      type: Number,
      trim: true,
      default: 0,
    },
    salePrice: {
      type: Number,
      required: true,
      trim: true,
      default: 0,
    },
    categories: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "ProductCategory",
    },
    collectionName: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    sold: {
      type: Number,
      default: 0,
      //   select: false,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    photos: [{ public_id: String, url: String }],
    size: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Size",
    },
    colors: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Color",
    },

    tags: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tag",
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalRating: {
      type: String,
      default: 0,
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

// export product schema

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
