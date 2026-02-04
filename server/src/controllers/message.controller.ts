import express from "express";
import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import Message from "../models/message";
import ApiError from "../utils/ApiError";
import Chat from "../models/Chat";
import mongoose from "mongoose";


export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
    const { chatId, content, messageType } = req.body;
    const senderId = req.user?.id;

    if (!senderId) {
        throw new ApiError(401, "Unauthorized");
    }

    if (!chatId || !content) {
        throw new ApiError(400, "chatId and content are required")
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
        content,
        messageType: messageType || "text",
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
        .sort({ createAt: 1 });

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
        throw new ApiError(403, "YOu can only delete your own mwssages")
    }
    await Message.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Message deleted successfully",
    });
});
