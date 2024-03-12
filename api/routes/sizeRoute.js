import express from "express";
import { isAdmin, tokenVerify } from "../middlewares/tokenVerify.js";
import {
  createSize,
  deleteSize,
  getAllSizes,
  getSingleSize,
  updateSize,
  updateSizeStatus,
} from "../controllers/sizeController.js";

// create router

const router = express.Router();

//verify token
router.use(tokenVerify);

// routing

router.route("/").get(getAllSizes).post(isAdmin, createSize);

router
  .route("/:id")
  .get(getSingleSize)
  .delete(isAdmin, deleteSize)
  .patch(isAdmin, updateSize);

router.route("/status/:id").put(isAdmin, updateSizeStatus);

// export router

export default router;
