import ProductCategory from "../models/ProductCategoryModel.js";
import asyncHandler from "express-async-handler";
import { createSlug } from "../helpers/createSlug.js";

/**
 * @description get all product categories
 * @route /api/v1/productCategory
 * @method GET
 * @access public
 */

export const getAllProductCategory = asyncHandler(async (req, res) => {
  // find all product categories

  const productCategories = await ProductCategory.find().populate([
    {
      path: "parentCategory",
      populate: {
        path: "parentCategory",
        populate: {
          path: "parentCategory",
        },
      },
    },
    {
      path: "subCategory",
      populate: {
        path: "subCategory",
        populate: {
          path: "subCategory",
        },
      },
    },
  ]);

  //   validation

  if (productCategories.length > 0)
    return res.status(200).json(productCategories);

  //   not found

  res.status(404).json({ message: "No Product Categories found" });
});

/**
 * @description create a product category
 * @route /api/v1/productCategory
 * @method POST
 * @access public
 */

export const createProductCategory = asyncHandler(async (req, res) => {
  // get data from body

  const { name, parentCategory } = req.body;

  //   required validation

  if (!name) throw new Error("Product Category Name Is Required");

  //   name check

  const nameCheck = await ProductCategory.findOne({ name });

  //   name check exists check

  if (nameCheck) throw new Error("The Product Category Name Is Already Exists");

  //   create new product category

  const createProductCategory = await ProductCategory.create({
    name,
    slug: createSlug(name),
    parentCategory: parentCategory ? parentCategory : null,
  });

  //   create parent category

  if (parentCategory) {
    await ProductCategory.findByIdAndUpdate(parentCategory, {
      $push: { subCategory: createProductCategory._id },
    }).populate("subCategory");
  }

  //  product category response

  res.status(201).json({
    productCategory: createProductCategory,
    message: "product cat created successful",
  });
});

/**
 * @description get single product category
 * @route /api/v1/productCategory/:id
 * @method GET
 * @access public
 */

export const getSingleProductCategory = asyncHandler(async (req, res) => {
  // get id from params

  const { id } = req.params;

  try {
    // find single product category

    const singleProductCategory = await ProductCategory.findById(id);

    // get single product category response

    res.status(200).json(singleProductCategory);
  } catch (error) {
    res.status(400).json({ message: "Single Product Category Not Found" });
  }
});

/**
 * @description delete a product category
 * @route /api/v1/productCategory/:id
 * @method DELETE
 * @access public
 */

export const deleteProductCategory = asyncHandler(async (req, res) => {
  // get id from params

  const { id } = req.params;

  // find id and delete product category

  const deleteProductCategory = await ProductCategory.findByIdAndDelete(id);

  //   already delete product category validation

  if (!deleteProductCategory)
    throw new Error(
      "That blog category you are finding has already been deleted"
    );

  // delete product category response

  res.status(200).json({
    productCategory: deleteProductCategory,
    message: "Product category delete Successful",
  });
});

/**
 * @description update a product category
 * @route /api/v1/productCategory/:id
 * @method PATCH
 * @access public
 */

export const updateProductCategory = asyncHandler(async (req, res) => {
  // get id from params

  const { id } = req.params;

  //  get data from body

  const { name, parentCategory } = req.body;

  //   name field required validation

  if (!name) throw new Error("The Name Field Is Required");

  // find the product category by id

  const productCategory = await ProductCategory.findById(id);

  //   not found validation

  if (!productCategory) throw new Error("The Product Category Is Not Found");

  //   update the product category

  const updateProductCategory = await ProductCategory.findByIdAndUpdate(
    id,
    {
      name,
      slug: createSlug(name),
      parentCategory: parentCategory ? parentCategory : null,
    },
    {
      new: true,
    }
  );

  //   update parent category

  if (parentCategory) {
    await ProductCategory.findByIdAndUpdate(parentCategory, {
      $push: { subCategory: updateProductCategory._id },
    });
  }

  //   response

  res.status(200).json({
    message: "Product category updated successfully",
    productCategory: updateProductCategory,
  });
});

/**
 * @description update product Category STATUS
 * @route /api/v1/blogCategory/status/:id
 * @method PATCH
 * @access public
 */

export const updateProductCategoryStatus = asyncHandler(async (req, res) => {
  // get blog category id from params

  const { id } = req.params;

  //  get blog category data from body

  const { status } = req.body;

  //   update blog category status

  const updateProductCategoryStatus = await ProductCategory.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    { new: true }
  );

  //  blog category status update response

  res.status(200).json({
    message: " Product Category Status Update Successful ",
    productCategory: updateProductCategoryStatus,
  });
});
