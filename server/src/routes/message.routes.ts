import { Router } from "express";
import { deleteMessage, getChatMessages, sendMessage, updateMessage } from "../controllers/message.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/", sendMessage);

router.get("/:chatId", getChatMessages);

router.put("/:id", updateMessage);

router.delete("/:id", deleteMessage);

export default router;