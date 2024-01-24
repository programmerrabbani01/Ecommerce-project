import express from "express";
import { isAdmin, tokenVerify } from "../middlewares/tokenVerify.js";
import {
  createBrand,
  deleteBrand,
  getAllBrand,
  getSingleBrand,
  updateBrand,
  updateBrandStatus,
} from "../controllers/brandController.js";
import { brandMulter } from "../utils/multer.js";

//router
const router = express.Router();

//verify token
router.use(tokenVerify);

//routing
router.route("/").get(getAllBrand).post(isAdmin, brandMulter, createBrand);
router
  .route("/:id")
  .get(getSingleBrand)
  .delete(isAdmin, brandMulter, deleteBrand)
  .patch(isAdmin, brandMulter, updateBrand);
router.route("/status/:id").patch(isAdmin, updateBrandStatus);

//export
export default router;
