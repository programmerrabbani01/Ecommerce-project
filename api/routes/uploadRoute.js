import express from "express";

import { isAdmin, tokenVerify } from "../middlewares/tokenVerify.js";

//router
const router = express.Router();

//routing
router.route("/").get(tokenVerify, isAdmin, getAllUser).post(createUser);
// router.post(
//   "/",
//   authMiddleware,
//   isAdmin,
//   uploadPhoto.array("images", 10),
//   productImgResize,
//   uploadImages
// );

// router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

//export
export default router;

const { uploadImages, deleteImages } = require("../controller/uploadCtrl");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImage");





