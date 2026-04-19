import express from "express";
import { register, login, getAllUsers, updateUser, deleteUser } from "../controllers/authController.js";
const router = express.Router();
import { loginLimiter } from "../rateLimit/loginLimiter.js";
import { protect } from "../middleware/authMiddleware.js"

router.post("/register", register);
router.get("/all-users",protect, getAllUsers)
router.put("/update/:id",protect, updateUser)
router.delete("/delete/:id",protect, deleteUser)
router.post("/login", loginLimiter, login);

export default router;