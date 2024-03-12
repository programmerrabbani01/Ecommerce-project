import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  ratingProduct,
  updateProduct,
  updateProductImageDelete,
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
  .put(isAdmin, productMulter, updateProduct);

router.route("/status/:id").patch(isAdmin, updateProductStatus);

router.route("/rating").put(ratingProduct);

router.route("/photos/:id").put(isAdmin, updateProductImageDelete);

//export
export default router;
