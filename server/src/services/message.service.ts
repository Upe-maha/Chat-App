import Chat from "../models/Chat";
import Message from "../models/Message";
import ApiError from "../utils/ApiError";


export const createMessage = async (data: {
    chatId: string;
    senderId: string;
    content: string;
    messageType?: string;
    fileUrl?: string;
    fileName?: string;
    fileSize?: number;
    fileMimeType?: string;
}) => {
    const { chatId,
        senderId,
        content,
        messageType = "text",
        fileUrl,
        fileName,
        fileSize,
        fileMimeType
    } = data;

    const chat = await Chat.findOne({
        _id: chatId,
        participants: senderId,
    });

    if (!chat) {
        throw new ApiError(403, "You are not a participant of this chat");
    }

    if (messageType === "text" && !content) {
        throw new ApiError(400, "Content is required for text messages");
    }

    if (["image", "video", "audio", "file"].includes(messageType) && !fileUrl) {
        throw new ApiError(400, "fileUrl is required for non-text messages");
    }

    //cteate message
    const message = await Message.create({
        chatId,
        senderId,
        content: messageType === "text" ? content : (fileName || "File"),
        messageType,
        fileUrl: fileUrl || undefined,
        fileName: fileName || undefined,
        fileSize: fileSize || undefined,
        fileMimeType: fileMimeType || undefined,
    })
    const populatedMessage = await message.populate("senderId", "username email");

    return populatedMessage;
}
