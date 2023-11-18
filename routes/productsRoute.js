import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/productsController.js";

const router = express.Router();

// Create
router.post('/createProduct', createProduct);

// Read
router.get('/readProduct', getAllProducts);

router.get('/readProduct/:productId', getProductById);

// Update
router.put('/updateProduct/:productId', updateProduct);

// Delete
router.delete('/deleteProduct/:productId', deleteProduct);

export default router;
