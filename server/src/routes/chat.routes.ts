import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { addParticipantToChat, createChat, deleteChat, getChatById, getUserChats, removeParticipantFormChat } from "../controllers/chat.controller";

const router = Router();

//apply authentication middleware to all chat routes
router.use(authMiddleware);

router.post("/", createChat);

router.get("/", getUserChats);

router.get("/:id", getChatById);

router.put("/:id/add-participant", addParticipantToChat);

router.put("/:id/remove-participant", removeParticipantFormChat);

router.delete("/:id", deleteChat);

export default router;
