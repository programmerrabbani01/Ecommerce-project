import BlogCategory from "../models/BlogCategoryModel.js";
import asyncHandler from "express-async-handler";
import { createSlug } from "../helpers/createSlug.js";

/**
 * @description Get All Blog Categories
 * @route /api/v1/blogCategory
 * @method GET
 * @access public
 */

export const getAllBlogCategory = asyncHandler(async (req, res) => {
  // find all blog categories

  const blogCategories = await BlogCategory.find();

  //   validation

  if (blogCategories.length > 0) return res.status(200).json(blogCategories);

  //   not found

  res.status(404).json({ message: "No Blog Categories Found" });
});

/**
 * @description Create a new blog category
 * @route /api/v1/blogCategory
 * @method POST
 * @access public
 */

export const createBlogCategory = asyncHandler(async (req, res) => {
  // get data from body

  const { name } = req.body;

  //   all fields are required validation

  if (!name) throw new Error("The name field is required !");

  // name check

  const nameCheck = await BlogCategory.findOne({ name });

  //   exists name founding

  if (nameCheck) throw new Error("The name is already present");

  //   create new blog category

  const newBlogCategory = await BlogCategory.create({
    name,
    slug: createSlug(name),
  });

  //   response

  res.status(200).json({
    message: "Blog Category Create Successful ",
    blogCategory: newBlogCategory,
  });
});

/**
 * @description Get Single Blog Category
 * @route /api/v1/blogCategory/:id
 * @method GET
 * @access public
 */

export const getSingleBlogCategory = asyncHandler(async (req, res) => {
  // get blog category id from params

  const { id } = req.params;

  //   find single blog category by id

  const singleBlogCategory = await BlogCategory.findById(id);

  // not found single blog category validation

  if (!singleBlogCategory) throw new Error(" Single blog category not found");

  //   get single blog category validation

  res.status(200).json({ blogCategory: singleBlogCategory });
});

/**
 * @description Delete Blog Category
 * @route /api/v1/blogCategory/:id
 * @method DELETE
 * @access public
 */

export const deleteBlogCategory = asyncHandler(async (req, res) => {
  // get blog category id from params

  const { id } = req.params;

  //   delete  a blog category

  const deleteABlogCategory = await BlogCategory.findByIdAndDelete(id);

  //   already deleted a blog category validation

  if (!deleteABlogCategory)
    throw new Error(
      "That blog category you are finding has already been deleted"
    );

  // delete response

  res.status(200).json({
    message: " Blog Category Delete Successful ",
    blogCategory: deleteABlogCategory,
  });
});

/**
 * @description update Blog Category
 * @route /api/v1/blogCategory/:id
 * @method PATCH
 * @access public
 */

export const updateBlogCategory = asyncHandler(async (req, res) => {
  // get blog category id from params

  const { id } = req.params;

  //  get blog category data from body

  const { name } = req.body;

  //   all fields are required validation

  if (!name) throw new Error("The name field is required !");

  //   find the blog category by category id

  const blogCategory = await BlogCategory.findById(id);

  // not found validation

  if (!blogCategory) throw new Error("The blog category is not found");

  // update blog category

  const updateBlogCategory = await BlogCategory.findByIdAndUpdate(
    id,
    {
      name,
      slug: createSlug(name),
    },
    {
      new: true,
    }
  );

  //   blog category update response

  res.status(200).json({
    message: " Blog Category Update Successful ",
    blogCategory: updateBlogCategory,
  });
});

/**
 * @description update Blog Category STATUS
 * @route /api/v1/blogCategory/status/:id
 * @method PATCH
 * @access public
 */

export const updateBlogCategoryStatus = asyncHandler(async (req, res) => {
  // get blog category id from params

  const { id } = req.params;

  //  get blog category data from body

  const { status } = req.body;

  //   update blog category status

  const updateBlogCategoryStatus = await BlogCategory.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    { new: true }
  );

  //  blog category status update response

  res.status(200).json({
    message: " Blog Category Status Update Successful ",
    blogCategory: updateBlogCategoryStatus,
  });
});
