import express from "express";
import {
  createOrder,
  getAllOrders,
  getSingleOrder,
  deleteOrder 
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/create", protect, createOrder);
router.get("/all", protect, getAllOrders);
router.get("/:id", protect, getSingleOrder);
// router.put("/update/:id", protect, updateOutlet);
router.delete("/delete/:id", protect, deleteOrder);

export default router;
