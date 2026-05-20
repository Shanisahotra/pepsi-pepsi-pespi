import express from "express";
import { register, login, getAllUsers, updateUser, deleteUser, searchUsers } from "../controllers/authController.js";
const router = express.Router();
import { loginLimiter } from "../rateLimit/loginLimiter.js";
import { protect } from "../middleware/authMiddleware.js"
import upload from "../middleware/upload.js";


router.post("/register", upload.single("image"), register);
router.get("/all-users",protect, getAllUsers)
router.put("/update/:id",protect, updateUser)
router.delete("/delete/:id",protect, deleteUser)
router.get("/search",protect, searchUsers)
router.post("/login", loginLimiter, login);

export default router;