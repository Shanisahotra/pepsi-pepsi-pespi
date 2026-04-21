import express from "express";
import {
  createOutlet,
  getAllOutlets,
  getOutletById,
  updateOutlet,
  deleteOutlet,
} from "../controllers/outletController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createOutlet);
router.get("/all", protect, getAllOutlets);
router.get("/:id", protect, getOutletById);
router.put("/update/:id", protect, updateOutlet);
router.delete("/delete/:id", protect, deleteOutlet);

export default router;