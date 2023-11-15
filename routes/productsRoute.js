import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productsController.js";
const router = express.Router();

router.route("/").post(createProduct).get(getProducts);
router.route("/:id").get(getProduct).delete(deleteProduct).put(updateProduct);

export default router;
