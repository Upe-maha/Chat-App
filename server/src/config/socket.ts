import { Server } from "socket.io";
import http from "http"
import { socketAuthMiddleware } from "../middlewares/socket.middleware";
import Chat from "../models/Chat";
import { createMessage } from "../services/message.service";

let io: Server | null = null;

export const initSocket = (server: http.Server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL || "*",
            credentials: true,
        }
    });

    io.use(socketAuthMiddleware);

    io.on("connection", (socket) => {
        console.log(`[Socket] Client connected: ${socket.id} | User: ${socket.data.userId}`);

        socket.on("join:chat", async (chatId: string) => {
            if (!chatId) return;

            const chat = await Chat.findOne({
                _id: chatId,
                participants: socket.data.userId,
            });
            if (!chat) return;

            socket.join(chatId);
        });

        socket.on("leave:chat", (chatId: string) => {
            if (chatId) socket.leave(chatId)
        });

        socket.on("typing", (chatId: string) => {
            if (chatId) {
                socket.to(chatId).emit("typing", {
                    chatId,
                    userId: socket.data.userId,
                });
            }
        });

        socket.on("stopTyping", (chatId: string) => {
            if (chatId) {
                socket.to(chatId).emit("stopTyping", {
                    chatId,
                    userId: socket.data.userId,
                })
            }
        })

        socket.on("message:send", async (data) => {
            try {
                const { chatId, content, messageType = "text", fileUrl, fileName, fileSize, fileMimeType } = data;

                if (!chatId) {
                    return socket.emit("message:error", {
                        error: "chatId is required",
                    });
                };

                const chat = await Chat.findOne({
                    _id: chatId,
                    participants: socket.data.userId,
                });

                if (!chat) {
                    return socket.emit("message:error", {
                        error: "You are not a participant of this chat",
                    })
                }

                if (messageType === "text" && (!content || !content.trim())) {
                    return socket.emit("message:error", {
                        error: "Message content cannot be empty",
                    });
                };

                if (["image", "video", "audio", "file"].includes(messageType) && !fileUrl) {
                    return socket.emit("message:error", {
                        error: "File URL is required for this message type",
                    });
                }

                const populatedServiceMessage = await createMessage({
                    chatId,
                    senderId: socket.data.userId,
                    content,
                    messageType,
                    fileUrl,
                    fileName,
                    fileSize,
                    fileMimeType,
                });

                socket.to(chatId).emit("message:new", populatedServiceMessage);
                socket.emit("message:sent", populatedServiceMessage);
            }
            catch (err) {
                socket.emit("message:error", {
                    error: `Failed to send message: ${err}`,
                });
            }
        });
        socket.on("disconnect", () => {
            console.log(`[Socket] Client disconnected: ${socket.id} | User: ${socket.data.userId}`);
        });
    });

    return io;
}

export const getIo = () => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
}