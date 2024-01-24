import express from "express";
import {
  addToWishlist,
  createProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  ratingProduct,
  updateProduct,
  updateProductStatus,
} from "../controllers/productController.js";
import { isAdmin, tokenVerify } from "../middlewares/tokenVerify.js";
import { productMulter } from "../utils/multer.js";

//router
const router = express.Router();

//verify token
router.use(tokenVerify);

//routing
router
  .route("/")
  .get(getAllProduct)
  .post(isAdmin, productMulter, createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .delete(isAdmin, productMulter, deleteProduct)
  .patch(isAdmin, productMulter, updateProduct);
router.route("/status/:id").patch(isAdmin, updateProductStatus);
router.route("/wishlist").put(addToWishlist);
router.route("/rating").put(ratingProduct);

//export
export default router;
