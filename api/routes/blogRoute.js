import express from "express";
import { isAdmin, tokenVerify } from "../middlewares/tokenVerify.js";
import {
  createBlog,
  deleteBlog,
  disLikeBlog,
  getAllBlog,
  getSingleBlog,
  likeBlog,
  updateBlog,
} from "../controllers/blogController.js";
import { blogMulter } from "../utils/multer.js";

//router
const router = express.Router();

//verify token
router.use(tokenVerify);

//routing
router.route("/").get(getAllBlog).post(isAdmin, blogMulter, createBlog);
router.route("/:id").get(getSingleBlog);
router
  .route("/:id")
  .delete(isAdmin, blogMulter, deleteBlog)
  .patch(isAdmin, blogMulter, updateBlog);
router.route("/like").post(likeBlog);
router.route("/disLike").post(disLikeBlog);

//export
export default router;
