import mongoose from "mongoose";
import { createSlug } from "../helpers/createSlug.js";
import Tag from "../models/Tag.js";
import asyncHandler from "express-async-handler";

/**
 * @desc get all Tag data
 * @route GET /tag
 * @access PUBLIC
 */

export const getAllTag = asyncHandler(async (req, res) => {
  const tags = await Tag.find();

  if (tags.length > 0) {
    return res.status(200).json(tags);
  }
});

/**
 * @desc create Tag data
 * @route POST /tag
 * @access PUBLIC
 */

export const createTag = asyncHandler(async (req, res) => {
  // get values
  const { name } = req.body;

  // validations
  if (!name) {
    return res.status(400).json({ message: "Tag name is required" });
  }
  // email check
  const nameCheck = await Tag.findOne({ name });

  if (nameCheck) {
    return res.status(400).json({ message: "Tag already exists" });
  }

  // create new Tag
  const tag = await Tag.create({
    name,
    slug: createSlug(name),
  });

  res.status(200).json({ tag, message: "Tag created successfully" });
});

/**
 * @desc get Single Tag data
 * @route GET /tag/:id
 * @access PUBLIC
 */

export const getSingleTag = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const tag = await Tag.findById(id);

    return res.status(200).json(tag);
  } catch (error) {
    res.status(400).json({ message: "No Tag found" });
  }
});

/**
 * @desc delete Tag data
 * @route DELETE /tag/:id
 * @access PUBLIC
 */

export const deleteTag = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const tag = await Tag.findByIdAndDelete(id);

  if (!tag) {
    return res.status(400).json({ message: "Tag delete failed" });
  }

  res.json({ message: "Tag Delete Successful", tag });
});

/**
 * @desc update Tag data
 * @route PATCH /tag/:id
 * @access PUBLIC
 */

// export const updateTag = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   const { name } = req.body;

//   // Validate if id is a valid ObjectId
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ message: "Invalid Tag ID" });
//   }

//   // validation
//   if (!name) {
//     return res.status(400).json({ message: "Tag Name Is required" });
//   }

//   const tag = await Tag.findById(id);

//   if (!tag) {
//     return res.status(400).json({ message: "Tag not found" });
//   }

//   const updateTagData = await Tag.findByIdAndUpdate(
//     id,
//     {
//       name,
//       slug: createSlug(name),
//     },
//     {
//       new: true,
//     }
//   );

//   res.json({
//     message: `Tag updated successful`,
//     tag: updateTagData,
//   });
// });

export const updateTag = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({ message: "Tag Name Is Required" });
  }

  const tag = await Tag.findById(id);

  if (!tag) {
    return res.status(400).json({ message: "Tag not found" });
  }

  const updateTagData = await Tag.findByIdAndUpdate(
    id,
    {
      name,
      slug: createSlug(name),
    },
    {
      new: true,
    }
  );

  res.json({
    message: "Tag updated successfully",
    tag: updateTagData,
  });
});

/**
 * @desc update Tag Status
 * @route PUT /tag/status/:id
 * @access PUBLIC
 */

export const updateTagStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const updateTagStatus = await Tag.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    {
      new: true,
    }
  );

  res.json({
    message: `Tag Status updated successful`,
    tag: updateTagStatus,
  });
});
