import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import Message from "../models/Message";
import ApiError from "../utils/ApiError";
import Chat from "../models/Chat";
import { createMessage } from "../services/message.service";
import { getIo } from "../config/socket";


export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
    const { chatId, content, messageType, fileUrl, fileName, fileSize, fileMimeType } = req.body;
    const senderId = req.user?.id;

    if (!senderId) {
        throw new ApiError(401, "Unauthorized");
    }

    if (!chatId) {
        throw new ApiError(400, "chatId is required");
    }

    if (messageType === "text" && (!content || !content.trim())) {
        throw new ApiError(400, "Message content cannot be empty");
    }

    if (["image", "video", "audio", "file"].includes(messageType) && !fileUrl) {
        throw new ApiError(400, "fileUrl is required for non-text messages");
    }

    // Create message with file metadata if provided
    const populatedServiceMessage = await createMessage({
        chatId,
        senderId,
        content,
        messageType,
        fileUrl,
        fileName,
        fileSize,
        fileMimeType,
    })

    //Emit real time event
    try {
        const io = getIo();
        io.to(chatId).emit("message:new", populatedServiceMessage);
    } catch (err) {
        console.error("Socket emit error:", err);
    }

    res.status(201).json({
        success: true,
        message: "Message sent successfully",
        data: populatedServiceMessage,
    })
})

export const getChatMessages = asyncHandler(async (req: Request, res: Response) => {
    const { chatId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized");
    }

    const chat = await Chat.findOne({
        _id: chatId,
        participants: userId,
    });

    if (!chat) {
        throw new ApiError(403, "You are not a participant of this chat");
    }

    const messages = await Message.find({ chatId })
        .populate("senderId", "username email")
        .sort({ createdAt: 1 }); // oldest first

    res.status(200).json({
        success: true,
        message: "Messages retrieved successfully",
        data: messages,
    });
})

export const deleteMessage = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized");
    }

    const message = await Message.findById(id);
    if (!message) {
        throw new ApiError(404, "Message not found");
    }
    if (!message.senderId.equals(userId)) {
        throw new ApiError(403, "You can only delete your own messages")
    }
    await message.deleteOne();

    // real time event
    try {
        const io = getIo();
        io.to(message.chatId.toString()).emit("message:deleted", { messageId: id });
    } catch (err) {
        console.error("Socket emit error:", err);
    }

    res.status(200).json({
        success: true,
        message: "Message deleted successfully",
    });
});


// Update message content before 30 seconds of sending
export const updateMessage = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized");
    }

    const message = await Message.findById(id);
    if (!message) {
        throw new ApiError(404, "Message not found");
    }

    if (!message.senderId.equals(userId)) {
        throw new ApiError(403, "You can only update your own messages")
    }

    if (!content || !content.trim()) {
        throw new ApiError(400, "Message content cannot be empty");
    }

    if (message.messageType !== "text") {
        throw new ApiError(400, "Only text messages can be updated");
    }

    // for time constraint of max 30 seconds
    const now = new Date();
    const createdTime = new Date(message.createdAt);
    const diffInSeconds = (now.getTime() - createdTime.getTime()) / 1000;

    if (diffInSeconds > 30) {
        throw new ApiError(400, "You can only update message within 30 seconds of sending it");
    }

    message.content = content.trim();
    await message.save();


    const populatedUpdatedMessage = await message.populate("senderId", "username email");

    // real time event
    try {
        const io = getIo();
        io.to(message.chatId.toString()).emit("message:updated", populatedUpdatedMessage);
    } catch (err) {
        console.error("Socket emit error:", err);
    }

    res.status(200).json({
        success: true,
        message: "Message update successfully",
        data: populatedUpdatedMessage,
    });
});
