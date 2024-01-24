import express from "express";
import { isAdmin, tokenVerify } from "../middlewares/tokenVerify.js";

import {
  createEnquire,
  deleteEnquire,
  getAllEnquires,
  getSingleEnquire,
  updateEnquire,
} from "../controllers/enqController.js";

//router
const router = express.Router();

//verify token
router.use(tokenVerify);

//routing
router.route("/").get(getAllEnquires).post(isAdmin, createEnquire);
router
  .route("/:id")
  .get(getSingleEnquire)
  .delete(isAdmin, deleteEnquire)
  .patch(isAdmin, updateEnquire);

//export
export default router;
