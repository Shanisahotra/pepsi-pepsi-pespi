import express from "express"
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js"

import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/create", protect, createProduct)
router.get("/all", protect, getAllProducts)
router.get("/:id", protect, getSingleProduct)
router.put("/update/:id", protect, updateProduct)
router.delete("/delete/:id", protect, deleteProduct)

export default router;