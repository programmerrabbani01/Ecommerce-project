import express from "express";
import { isAdmin, tokenVerify } from "../middlewares/tokenVerify.js";
import {
  createTag,
  deleteTag,
  getAllTag,
  getSingleTag,
  updateTag,
  updateTagStatus,
} from "../controllers/tagController.js";

// create router

const router = express.Router();

//verify token
router.use(tokenVerify);

// routing

router.route("/").get(getAllTag).post(isAdmin, createTag);

router
  .route("/:id")
  .get(getSingleTag)
  .delete(isAdmin, deleteTag)
  .patch(isAdmin, updateTag);

router.route("/status/:id").put(isAdmin, updateTagStatus);

// export router

export default router;
