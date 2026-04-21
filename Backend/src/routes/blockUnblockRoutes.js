import express from "express";
import { blockUser,unblockUser  } from "../controllers/blockUnblockController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js"

router.put("/block/:id", protect, blockUser);
router.put("/unblock/:id", protect, unblockUser);

export default router;