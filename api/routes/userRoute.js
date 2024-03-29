import express from "express";
import {
  blockUser,
  createUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  getWishList,
  unBlockUser,
  updateUser,
  updateUserStatus,
  userAddress,
  AddUserCart,
  getUserCart,
  deleteUserCart,
  applyCoupon,
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getSingleOrder,
  getOrderUserId,
  getOrders,
  addToWishlist,
  forgotPasswordToken,
  resetPassword,
} from "../controllers/userController.js";

import { isAdmin, tokenVerify } from "../middlewares/tokenVerify.js";
import { userMulter } from "../utils/multer.js";

//router
const router = express.Router();

//routing
router.route("/").get(tokenVerify, isAdmin, getAllUser).post(createUser);
router.route("/wishList").get(tokenVerify, getWishList);
router.route("/wishlist").put(tokenVerify, addToWishlist);
router
  .route("/cart")
  .get(tokenVerify, getUserCart)
  .post(tokenVerify, AddUserCart)
  .delete(tokenVerify, deleteUserCart);
router.route("/applyCoupon").post(tokenVerify, applyCoupon);
router.route("/cart/cashOrder").post(tokenVerify, createOrder);
router.route("/allOrders").get(tokenVerify, isAdmin, getAllOrders);
router.route("/getOrders").get(tokenVerify, isAdmin, getOrders);
router.route("/getSingleOrder").get(getSingleOrder);
router.route("/getOrderUserId/:id").get(tokenVerify, isAdmin, getOrderUserId);
router
  .route("/order/orderStatus/:id")
  .put(tokenVerify, isAdmin, updateOrderStatus);
router
  .route("/:id")
  .get(getSingleUser)
  .delete(tokenVerify, isAdmin, deleteUser)
  .patch(tokenVerify, isAdmin, userMulter, updateUser);
router.route("/address").put(userAddress);
router.route("/status/:id").patch(tokenVerify, isAdmin, updateUserStatus);
router.route("/blockUser/:id").get(tokenVerify, isAdmin, blockUser);
router.route("/unBlockUser/:id").get(tokenVerify, isAdmin, unBlockUser);
router.route("/forgetPassword").post(forgotPasswordToken);
router.route("/resetPassword/:token").post(resetPassword);

//export
export default router;
