import express from "express";
import { isAdmin, tokenVerify } from "../middlewares/tokenVerify.js";
import {
  createBlogCategory,
  deleteBlogCategory,
  getAllBlogCategory,
  getSingleBlogCategory,
  updateBlogCategory,
  updateBlogCategoryStatus,
} from "../controllers/blogCategoryController.js";

//router
const router = express.Router();

//verify token
router.use(tokenVerify);

//routing
router.route("/").get(getAllBlogCategory).post(isAdmin, createBlogCategory);
router
  .route("/:id")
  .get(getSingleBlogCategory)
  .delete(isAdmin, deleteBlogCategory)
  .patch(isAdmin, updateBlogCategory);
router.route("/status/:id").patch(isAdmin, updateBlogCategoryStatus);

//export
export default router;
