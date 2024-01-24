import express from "express";
import { isAdmin, tokenVerify } from "../middlewares/tokenVerify.js";
import {
  createCoupon,
  deleteCoupon,
  getAllCoupon,
  getSingleCoupon,
  updateCoupon,
  updateCouponStatus,
} from "../controllers/couponController.js";

//router
const router = express.Router();

//verify token
router.use(tokenVerify);

//routing
router.route("/").get(getAllCoupon).post(isAdmin, createCoupon);
router
  .route("/:id")
  .get(getSingleCoupon)
  .delete(isAdmin, deleteCoupon)
  .patch(isAdmin, updateCoupon);
router.route("/status/:id").patch(isAdmin, updateCouponStatus);

//export
export default router;
