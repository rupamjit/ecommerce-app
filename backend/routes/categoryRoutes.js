import express from "express";
const router = express.Router();
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryConteroller.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route("/:categoryId").put(authenticate, authorizeAdmin, updateCategory);
router
  .route("/:categoryId")
  .delete(authenticate, authorizeAdmin, removeCategory);

router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);
router.route("/").post(authenticate, authorizeAdmin, createCategory);

export default router;
