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

  const products = await query
    .populate("colors")
    .populate("tags")
    .populate("size")
    .populate("categories");

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
    regularPrice,
    salePrice,
    brand,
    quantity,
    categories,
    colors,
    tags,
    collectionName,
    size,
  } = req.body;

  // check validation
  if (!title || !salePrice || !quantity) {
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

      photos.push({
        url: fileData.url,
        public_id: fileData.public_id,
      });
    }
  }

  // Parse colors and tags from string representations
  const cleanedColorsString = colors.replace(/'/g, '"');
  const cleanedTagsString = tags.replace(/'/g, '"');
  const cleanedSizeString = size.replace(/'/g, '"');
  const cleanedCategoryString = categories.replace(/'/g, '"');
  const colorsArray = JSON.parse(cleanedColorsString);
  const tagsArray = JSON.parse(cleanedTagsString);
  const sizeArray = JSON.parse(cleanedSizeString);
  const categoryArray = JSON.parse(cleanedCategoryString);

  // create new  product
  const product = await Product.create({
    title,
    slug: slugify(title),
    desc,
    regularPrice,
    salePrice,
    brand,
    quantity,
    categories: categoryArray,
    collectionName,
    colors: colorsArray,
    tags: tagsArray,
    photos: photos.length > 0 ? photos : null,
    size: sizeArray,
  });

  // confirm create product
  const findProduct = await Product.findById(product.id)
    .populate("colors")
    .populate("tags")
    .populate("size")
    .populate("categories");

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

  try {
    const product = await Product.findById(id)
      .populate("colors")
      .populate("tags")
      .populate("size")
      .populate("categories");
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: "product not found" });
  }
});

/**
 * @desc update product
 * @route PATCH /product/:id
 * @access PUBLIC
 */

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const {
    title,
    desc,
    salePrice,
    regularPrice,
    brand,
    quantity,
    categories,
    collectionName,
    colors,
    tags,
    size,
  } = req.body;

  // validation

  if (!title || !salePrice || !quantity) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // find product by id
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Logo upload

  // Update photos only if new photos are provided
  let updatePhotos = [...product.photos];

  if (req.files && req.files?.length >= 0) {
    // If new photos are provided, upload them and update the photo array

    for (let i = 0; i < req.files?.length; i++) {
      const fileData = await cloudUploads(req.files[i].path);
      updatePhotos.push({
        url: fileData.url,
        public_id: fileData.public_id,
      });
    }
  }

  // Parse categories from string representation
  const cleanedCategoryString = categories.replace(/'/g, '"');
  const categoryArray = JSON.parse(cleanedCategoryString);
  const cleanedColorString = colors.replace(/'/g, '"');
  const colorArray = JSON.parse(cleanedColorString);
  const cleanedTagString = tags.replace(/'/g, '"');
  const tagArray = JSON.parse(cleanedTagString);
  const cleanedSizeString = size.replace(/'/g, '"');
  const sizeArray = JSON.parse(cleanedSizeString);

  // update product data

  const updateProduct = await Product.findByIdAndUpdate(
    id,
    {
      title,
      slug: slugify(title),
      salePrice,
      regularPrice,
      desc,
      quantity,
      collectionName,
      colors: colorArray || [],
      size: sizeArray || [],
      categories: categoryArray || [],
      brand: brand || null,
      tags: tagArray || [],
      photos: updatePhotos || [],
    },
    {
      new: true,
    }
  )
    .populate("brand")
    .populate("categories")
    .populate("colors")
    .populate("tags")
    .populate("size");

  res.json({ message: `Product updated successful`, product: updateProduct });
});

/**
 * @DESC update a Product delete
 * @ROUTE /api/v1/product/:id
 * @METHOD PATCH
 * @ACCESS protected
 */
export const updateProductImageDelete = asyncHandler(async (req, res) => {
  try {
    // get params id
    const { id } = req.params;
    // get body data
    const { imageId } = req.body;
    const pd = await Product.findById(id);

    if (imageId) {
      await cloudDelete(imageId);
    }
    // Find product by id
    const product = await Product.findByIdAndUpdate(
      id,
      {
        photos: pd?.photos?.filter((img) => {
          return img.public_id !== imageId;
        }),
      },
      { new: true }
    );

    //if does not available product
    if (!product) {
      throw new Error("Product Image Not Found!");
    }

    res
      .status(200)
      .json({ imageId: imageId, message: "Image Delete successfully" });
  } catch (error) {
    throw new Error("something went wrong");
  }
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
  // if (product.photos && product.photos.length > 0) {
  //   const publicIds = product.photos.map((photo) => findPublicId(photo));

  //   // Assuming 'cloudDelete' can delete multiple photos
  //   await Promise.all(publicIds.map((publicId) => cloudDelete(publicId)));
  // }

  if (product?.photos?.length >= 0) {
    for (const file of product?.photos) {
      await cloudDelete(file.public_id);
    }
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
