import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler";
import slugify from "slugify";
import { cloudDelete, cloudUpload, cloudUploads } from "../utils/cloudinary.js";
import { findPublicId } from "../helpers/helpers.js";

/**
 * @desc get all Products
 * @route GET /product
 * @access PUBLIC
 */

export const getAllProduct = asyncHandler(async (req, res) => {
  // Filtering

  const queryObj = { ...req.query };

  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);

  let queryStr = JSON.stringify(queryObj);

  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/gi, (match) => `$${match}`);

  // query for product

  let query = Product.find(JSON.parse(queryStr));

  // sorting

  const sort = req.query.sort || "";
  if (sort) {
    const sortBy = sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // limiting the fields

  const fields = req.query.fields || null;

  if (fields) {
    const field = fields.split(",").join(" ");
    query = query.select(field);
  } else {
    query = query.select("-__v");
  }

  // pagination

  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  if (page) {
    const productCount = await Product.countDocuments();

    if (skip >= productCount) throw new Error("This Page Dose Not Exists ");
  }

  // get all product

  const products = await query.populate("colors").populate("tags");

  // validation

  if (products.length > 0) {
    return res.status(200).json(products);
  }

  return res.status(404).json({ message: "No Product Found" });
});

/**
 * @desc Create Product
 * @route POST /product
 * @access PUBLIC
 */

export const createProduct = asyncHandler(async (req, res) => {
  // get data
  const {
    title,
    desc,
    price,
    brand,
    quantity,
    categories,
    colors,
    tags,
    collectionName,
  } = req.body;

  // check validation
  if (
    !title ||
    !desc ||
    !price ||
    !brand ||
    !quantity ||
    !categories ||
    !colors ||
    !tags ||
    !collectionName
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // email check
  const titleCheck = await Product.findOne({ title });

  // title exists check
  if (titleCheck) {
    return res.status(400).json("Product title is already exists");
  }

  //  cloud Upload
  let photos = [];

  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      const fileData = await cloudUploads(req.files[i].path);
      photos.push(fileData);
    }
  }

  // Parse colors and tags from string representations
  const cleanedColorsString = colors.replace(/'/g, '"');
  const cleanedTagsString = tags.replace(/'/g, '"');
  const colorsArray = JSON.parse(cleanedColorsString);
  const tagsArray = JSON.parse(cleanedTagsString);

  // create new  product
  const product = await Product.create({
    title,
    slug: slugify(title),
    desc,
    price,
    brand,
    quantity,
    categories,
    collectionName,
    colors: colorsArray,
    tags: tagsArray,
    photos: photos.length > 0 ? photos : null,
  });

  // confirm create product
  const findProduct = await Product.findById(product.id)
    .populate("colors")
    .populate("tags");

  // check
  if (product) {
    return res
      .status(201)
      .json({ message: "Product created successfully", product: findProduct });
  } else {
    return res.status(400).json({ message: "Invalid product data" });
  }
});

/**
 * @desc get Single product
 * @route GET /product/:id
 * @access PUBLIC
 */

export const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return res.status(400).json({ message: "No product found" });
  }

  res.json(product);
});

/**
 * @desc update product
 * @route PATCH /product/:id
 * @access PUBLIC
 */

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name, desc, price, brand, quantity, categories, colors, tags } =
    req.body;

  // validation

  if (
    !name ||
    !desc ||
    !price ||
    !brand ||
    !quantity ||
    !categories ||
    !colors ||
    !tags
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Logo upload

  let updatePhotos = product.photos;

  console.log(updatePhotos); // Clone the existing photos array

  if (req.files && req.files.length > 0) {
    for (let i = 0; i < req.files.length; i++) {
      const fileData = await cloudUploads(req.files[i].path);
      updatePhotos = fileData;

      // Delete the old cloud image using its public ID

      await cloudDelete(findPublicId(product.photos[i]));
    }
  }

  // update product data

  product.name = name;
  product.slug = slugify(name);
  product.photos = updatePhotos;
  product.desc = desc;
  product.price = price;
  product.brand = brand;
  product.quantity = quantity;
  product.categories = categories;
  product.colors = colors;
  product.tags = tags;

  product.save();

  res.json({ message: `Product updated successful`, product: product });
});

/**
 * @desc delete product
 * @route DELETE /product/:id
 * @access PUBLIC
 */

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return res.status(400).json({ message: "Product delete failed" });
  }

  // remove photo from cloudinary

  // Check if 'product.photos' exists before attempting to delete photos
  if (product.photos && product.photos.length > 0) {
    const publicIds = product.photos.map((photo) => findPublicId(photo));

    // Assuming 'cloudDelete' can delete multiple photos
    await Promise.all(publicIds.map((publicId) => cloudDelete(publicId)));
  }

  res.status(200).json({ message: "Product Delete Successful", product });
});

/**
 * @desc update product status
 * @route PATCH /product/:id
 * @access PUBLIC
 */

export const updateProductStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const updateProductStatus = await Product.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    {
      new: true,
    }
  );

  res.json({
    message: `Product Status Updated Successful`,
    product: updateProductStatus,
  });
});

/**
 * @desc add to wishlist
 * @route PUT /api/v1/product/wishlist
 * @access public
 */

export const addToWishlist = asyncHandler(async (req, res) => {
  // get product id from body

  const { productId } = req.body;

  // product id is required validation

  if (!productId) throw new Error("Product ID Must Be Provided");

  // find login user

  const { email } = req.me;

  const user = await User.findOne({ email });

  // user not valid

  if (!user) throw new Error("Invalid User");

  // already added a product to Wishlist

  const alreadyAdded = await user.wishList.find(
    (el) => el.toString() === productId
  );

  // already added a product to wishlist

  if (alreadyAdded) {
    const removeWishlist = await User.findByIdAndUpdate(
      user._id,
      {
        $pull: {
          wishList: productId,
        },
      },
      {
        new: true,
      }
    );

    // remove  a product from the wishlist response

    return res
      .status(200)
      .json({ wishList: removeWishlist, message: "Remove wishlist Item" });
  } else {
    const addWishlist = await User.findByIdAndUpdate(
      user._id,
      {
        $push: {
          wishList: productId,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      wishList: addWishlist,
      message: "added to the Wishlist is successful",
    });
  }
});

/**
 * @desc rating a product
 * @route PATCH /product/rating
 * @access PUBLIC
 */

export const ratingProduct = asyncHandler(async (req, res) => {
  // Get data from the request body

  const { star, productId, comment } = req.body;

  // Product ID is required validation

  if (!productId) {
    return res.status(400).json({ error: "Product ID must be provided" });
  }

  // Find the product by product ID

  const product = await Product.findById(productId);

  // Product not found check

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  // Find the logged-in user

  const { email } = req.me;
  const user = await User.findOne({ email });

  // User not valid

  if (!user) {
    return res.status(401).json({ error: "Invalid User" });
  }

  // Check if the user has already rated the product

  const alreadyRated = product.ratings.some(
    (rating) => rating.postedBy.toString() === user._id.toString()
  );

  console.log(alreadyRated);

  if (alreadyRated) {
    // User has already rated, update the existing rating

    product.ratings.forEach((rating) => {
      if (rating.postedBy.equals(user._id)) {
        rating.star = star;
        rating.comment = comment;
      }
    });
  } else {
    // User hasn't rated, add a new rating

    product.ratings.push({
      star,
      comment,
      postedBy: user._id,
    });
  }

  // Calculate the total ratings and sum of ratings

  const totalRatings = product.ratings.length;

  const totalRatingsSum = product.ratings.reduce(
    (previous, current) => previous + current.star,
    0
  );

  // Calculate the actual average rating (rounded)

  const actualRatings = Math.round(totalRatingsSum / totalRatings).toFixed(1);

  // Update the product's totalRating field with the calculated value

  product.totalRating = actualRatings;

  // Save the product with the updated rating

  await product.save();

  // Respond with the updated product

  res.status(200).json(product);
});
