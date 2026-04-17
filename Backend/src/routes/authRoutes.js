import express from "express";
import { register, login } from "../controllers/authController.js";
const router = express.Router();
import { loginLimiter } from "../rateLimit/loginLimiter.js";


router.post("/register", register);
router.post("/login", loginLimiter, login);

export default router;