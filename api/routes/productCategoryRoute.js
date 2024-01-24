import express from "express";
import { isAdmin, tokenVerify } from "../middlewares/tokenVerify.js";
import {
  createProductCategory,
  deleteProductCategory,
  getAllProductCategory,
  getSingleProductCategory,
  updateProductCategory,
  updateProductCategoryStatus,
} from "../controllers/productCategoryController.js";

//router
const router = express.Router();

//verify token
router.use(tokenVerify);

//routing
router
  .route("/")
  .get(getAllProductCategory)
  .post(isAdmin, createProductCategory);
router
  .route("/:id")
  .get(getSingleProductCategory)
  .delete(isAdmin, deleteProductCategory)
  .patch(isAdmin, updateProductCategory);
router.route("/status/:id").patch(isAdmin, updateProductCategoryStatus);

//export
export default router;
