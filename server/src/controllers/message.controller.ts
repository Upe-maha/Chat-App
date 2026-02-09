import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import Message from "../models/Message";
import ApiError from "../utils/ApiError";
import Chat from "../models/Chat";


export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
    const { chatId, content, messageType, fileId } = req.body;
    const senderId = req.user?.id;

    if (!senderId) {
        throw new ApiError(401, "Unauthorized");
    }

    if (!chatId) {
        throw new ApiError(400, "chatId is required")
    }

    if (messageType === "text") {
        if (!content) {
            throw new ApiError(400, "Content is required for text messages.");
        }
    } else if (["image", "video", "audio", "file"].includes(messageType)) {
        if (!fileId) {
            throw new ApiError(400, "fileId is required for non-text messages.");
        }
        else {
            throw new ApiError(400, "Invalid message type");
        }
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
        throw new ApiError(404, "Chat not found");
    }

    // if (!chat.participants.some((p) => p.toString() === senderId)) {
    //     throw new ApiError(403, "You are not a participant of this chat");
    // } same but more efficient way is to use "equales()" (MongoDB’s ObjectId has a built-in comparison method)
    if (!chat.participants.some((p) => p.equals(senderId))) {
        throw new ApiError(403, "You are not a participant of this chat");
    }

    const message = await Message.create({
        chatId,
        senderId,
        content: content || `File: ${fileId}`,
        messageType: messageType || "text",
        fileId: fileId || undefined,
    });

    const populatedMessage = await message.populate("senderId", "username email");

    res.status(201).json({
        success: true,
        message: "Message sent successfully",
        data: populatedMessage,
    })
})

export const getChatMessages = asyncHandler(async (req: Request, res: Response) => {
    const { chatId } = req.params;
    const userId = req.user?.id;

    const chat = await Chat.findById(chatId);
    if (!chat) {
        throw new ApiError(404, "Chat not found");
    }

    if (!chat.participants.some((p) => p.equals(userId))) {
        throw new ApiError(403, "You are not a participant of this chat");
    }

    const messages = await Message.find({ chatId })
        .populate("senderId", "username email")
        .sort({ createdAt: 1 });

    res.status(200).json({
        success: true,
        message: "Messages retrieved successfully",
        data: messages,
    });
})

export const deleteMessage = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id;

    const message = await Message.findById(id);
    if (!message) {
        throw new ApiError(404, "Message not found");
    }
    if (!message.senderId.equals(userId)) {
        throw new ApiError(403, "You can only delete your own messages")
    }
    await Message.findByIdAndDelete(id);

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

    const message = await Message.findById(id);
    if (!message) {
        throw new ApiError(404, "Message not found");
    }

    if (!message.senderId.equals(userId)) {
        throw new ApiError(403, "You can only update your own messages")
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

    message.content = content;
    await message.save();

    const populatedUpdatedMessage = await message.populate("senderId", "username email");

    res.status(200).json({
        success: true,
        message: "Message update successfully",
        data: populatedUpdatedMessage,
    });
});
