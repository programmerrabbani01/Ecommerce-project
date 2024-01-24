import express from "express";
import { isAdmin, tokenVerify } from "../middlewares/tokenVerify.js";
import {
  createColor,
  deleteColor,
  getAllColors,
  getSingleColor,
  updateColor,
  updateColorStatus,
} from "../controllers/colorController.js";

//router
const router = express.Router();

//verify token
router.use(tokenVerify);

//routing
router.route("/").get(getAllColors).post(isAdmin, createColor);
router
  .route("/:id")
  .get(getSingleColor)
  .delete(isAdmin, deleteColor)
  .patch(isAdmin, updateColor);
router.route("/status/:id").put(isAdmin, updateColorStatus);

//export
export default router;
