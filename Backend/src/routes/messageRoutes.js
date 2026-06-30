import express from "express";
import { sendMessage, getChat, updateMessage, deleteMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/chat", getChat);

router.put("/:messageId", updateMessage);
router.delete("/:messageId", deleteMessage);

export default router;