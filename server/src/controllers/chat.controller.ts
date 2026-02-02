import Chat from "../models/chat";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";

export const createChat = asyncHandler(async (req: Request, res: Response) => {
    const { name, description, participants, isGroup } = req.body;
    const userId = req.user?.id;

    if (!name || !participants || participants.length === 0) {
        throw new ApiError(400, "Name and participants are required to create a chat");
    }

    if (!participants.includes(userId)) {
        participants.push(userId);
    }

    const chat = await Chat.create({
        name: name || "Direct Message",
        participants,
        createdBy: userId,
        description,
        isGroup: isGroup || false,
    })

    // const populatedChat = await chat.populate("participants", "username email");
    // const chatResponse = await chat.populate("createdBy", "username email");
    // or we can do like this: Chain populate calls => more cleaner
    const populatedChat = await chat
        .populate("participants", "username email")
        .then(() => chat.populate("createdBy", "username email"));

    res.status(201).json({
        success: true,
        message: "Chat created successfully",
        data: populatedChat,
    });
});

// get all chats for a user
export const getUserChats = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;

    const chats = await Chat.find({ participants: userId })
        .populate("participants", "username email")
        .populate("createdBy", "username email")
        .sort({ updatedAt: -1 });

    res.status(200).json({
        success: true,
        message: "User chats retrieved successfully",
        data: chats,
    });
})




// get single chat by id
export const getChatById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const chat = await Chat.findById(id)
        .populate("participants", "username email")
        .populate("createdBy", "username email");


    if (!chat) {
        throw new ApiError(404, "Chat not found");
    }

    res.status(200).json({
        success: true,
        message: "Chat retrieved successfully",
        data: chat,
    });
});

// add participant to chat
export const addParticipantToChat = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { participantId } = req.body;

    if (!participantId) {
        throw new ApiError(400, "Participant ID is required");
    }

    const chat = await Chat.findById(id);
    if (!chat) {
        throw new ApiError(404, "Chat not found");
    }

    if (!chat.isGroup) {
        throw new ApiError(400, "Cannot add participants to a direct message chat");
    }

    if (chat.participants.includes(participantId)) {
        throw new ApiError(409, "Participant is already in the chat");
    }

    chat.participants.push(participantId);
    await chat.save();

    const populatedChat = await chat.populate("participants", "username email")
        .then(() => chat.populate("createdBy", "username email"));

    res.status(200).json({
        success: true,
        message: "Participant added to chat successfully",
        data: populatedChat,
    });
});


//remove participant from chat
export const removeParticipantFormChat = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { participantId } = req.body;

    if (!participantId) {
        throw new ApiError(400, "Participant ID is required");
    }

    const chat = await Chat.findById(id);
    if (!chat) {
        throw new ApiError(404, "Chat not found");
    }

    if (!chat.isGroup) {
        throw new ApiError(400, "Cannot remove participants from a direct message chat");
    }

    chat.participants = chat.participants.filter(
        (p) => p.toString() !== participantId
    );
    await chat.save();

    const updatedChat = await chat.populate("participants", "username email");

    res.status(200).json({
        success: true,
        message: "Participant removed from chat successfully",
        data: updatedChat,
    });
});

// Delete chat
export const deleteChat = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id;

    const chat = await Chat.findById(id);
    if (!chat) {
        throw new ApiError(404, "Chat not found");
    }

    // Only creator can delete
    if (chat.createdBy.toString() !== userId) {
        throw new ApiError(403, "Only chat creator can delete");
    }

    await Chat.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Chat deleted successfully",
    });
});