import asyncHandler from "express-async-handler";
import Blog from "../models/BlogModel.js";
import { createSlug } from "../helpers/createSlug.js";
import { cloudDelete, cloudUpload } from "../utils/cloudinary.js";
import { findPublicId } from "../helpers/helpers.js";

/**
 * @desc get all Blog data
 * @route /api/v1/blog
 * @Method GET
 * @access PUBLIC
 */

export const getAllBlog = asyncHandler(async (req, res) => {
  // find all blogs data

  const blogs = await Blog.find();

  // return all blogs data

  if (blogs.length > 0) return res.status(200).json(blogs);

  //   if blogs data is not found

  res.status(404).json({ message: " No Blog Data Found " });
});

/**
 * @desc Create a new blog
 * @route /api/v1/blog
 * @Method POST
 * @access PUBLIC
 */

export const createBlog = asyncHandler(async (req, res) => {
  // get body data

  const { title, description, category, author } = req.body;

  // validations

  if (!title) {
    return res.status(400).json("Title is required");
  }

  // title check

  const titleCheck = await Blog.findOne({ title });

  //   title check validation

  if (titleCheck) return res.status(201).json("Blog Name already exists");

  // cloud Upload

  let createLogo = null;

  if (req.file) {
    const logo = await cloudUpload(req);
    createLogo = logo?.secure_url;
  }

  // create new Blog

  const blog = await Blog.create({
    title,
    slug: createSlug(title),
    description,
    category,
    author,
    image: createLogo ? createLogo : null,
  });

  return res.status(201).json({ blog, message: "Blog create successful" });
});

/**
 * @desc get Single Blog
 * @route /api/v1/blog/:slug
 * @Method GET
 * @access PUBLIC
 */

export const getSingleBlog = asyncHandler(async (req, res) => {
  // get params slug

  const { slug } = req.params;

  //find blog data

  const blog = await Blog.findOne({ slug });

  // if not found blog data

  if (!blog) throw new Error("Blog not found");

  // blog views update

  const blogData = await Blog.findByIdAndUpdate(
    blog._id,
    {
      $inc: { numViews: 1 },
    },
    { new: true }
  );

  // return blog data

  res.status(200).json({ blog: blogData });
});

/**
 * @desc delete Blog
 * @route /api/v1/blog/:id
 * @Method DELETE
 * @access PUBLIC
 */

export const deleteBlog = asyncHandler(async (req, res) => {
  // get id from prams

  const { id } = req.params;

  //find and delete blog

  const blog = await Blog.findByIdAndDelete(id);

  //not available blog

  if (!blog) throw new Error("Blog Already Deleted");

  // remove photo

  if (blog.image) {
    const publicId = findPublicId(blog.image);

    await cloudDelete(publicId);
  }

  //response

  res.status(200).json({ message: "Blog Delete Successful", blog });
});

/**
 * @desc update a Blog
 * @route /api/v1/blog/:id
 * @Method PATCH
 * @access PUBLIC
 */

export const updateBlog = asyncHandler(async (req, res) => {
  // get id from prams

  const { id } = req.params;

  // get data from body

  const { title, description, category, author } = req.body;

  // validation

  if (!title) throw new Error("Blog title Is required");

  // is available blog data

  const blog = await Blog.findById(id).exec();

  // is not available a blog data

  if (!blog) throw new Error("Blog not found");

  // logo upload

  let updatePhoto = blog.image;

  if (req.file) {
    const logo = await cloudUpload(req);
    updatePhoto = logo?.secure_url;

    await cloudDelete(findPublicId(blog.image));
  }

  // update blog

  blog.title = title;
  blog.slug = createSlug(title);
  blog.image = updatePhoto;
  blog.save();

  // response blog update

  res.status(200).json({
    message: `Blog updated successful`,
    blog: blog,
  });
});

/**
 * @desc is like Blog
 * @route /api/v1/blog/like
 * @Method POST
 * @access PUBLIC
 */

export const likeBlog = asyncHandler(async (req, res) => {
  // get body data

  const { blogId } = req.body;

  //   blog id validation

  if (!blogId) throw new Error("Invalid Blog ID");

  // find blog

  const blog = await Blog.findById(blogId);

  console.log(blog);

  // login user

  const user = req.me;

  // already dislike blog

  const dislike = blog.disLikes.find(
    (item) => item._id.toString() === user._id.toString()
  );

  // if dislike is available

  if (dislike) {
    await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { disLikes: user._id },
        isDisLiked: false,
      },
      {
        new: true,
      }
    );
  }

  // if like true

  if (blog.isLiked === true) {
    const unLikeBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: user._id },
        isLiked: false,
      },
      {
        new: true,
      }
    ).populate("likes");

    // response

    res
      .status(200)
      .json({ message: "Blog unLike successful ", blog: unLikeBlog });
  } else {
    const likeBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: user._id },
        isLiked: true,
      },
      {
        new: true,
      }
    ).populate("likes");

    // response
    res.status(200).json({ message: "Blog like successful ", blog: likeBlog });
  }
});

/**
 * @desc dis like Blog
 * @route /api/v1/blog/disLike
 * @Method POST
 * @access PUBLIC
 */

export const disLikeBlog = asyncHandler(async (req, res) => {
  // get body data

  const { blogId } = req.body;

  //  blog id validation

  if (!blogId) throw new Error("Invalid Blog ID");

  // find blog

  const blog = await Blog.findById(blogId);

  // login user

  const user = req.me;

  // already like blog

  const like = blog.likes.find(
    (el) => el._id.toString() === user._id.toString()
  );

  //if like is available

  if (like) {
    await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: user._id },
        isLiked: false,
      },
      {
        new: true,
      }
    );
  }

  // if dislike true

  if (blog.isDisLiked === true) {
    const unDisLike = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { disLikes: user._id },
        isDisLiked: false,
      },
      {
        new: true,
      }
    ).populate("disLikes");

    // response

    res
      .status(200)
      .json({ message: "Blog unDislike successful ", blog: unDisLike });
  } else {
    const dislike = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { disLikes: user._id },
        isDisLiked: true,
      },
      {
        new: true,
      }
    ).populate("disLikes");

    // response

    res
      .status(200)
      .json({ message: "Blog dislike successful ", blog: dislike });
  }
});
