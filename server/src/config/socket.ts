import { Server } from "socket.io";
import http from "http"
import { socketAuthMiddleware } from "../middlewares/socket.middleware";
import Chat from "../models/Chat";
import Message from "../models/Message";
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
        console.log("Client connected: ", socket.id);

        socket.on("join:chat", async (chatId: string) => {
            if (!chatId) return;

            const chat = await Chat.findOne({
                _id: chatId,
                participents: socket.data.userId,
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

        socket.on("message:send", async (data) => {
            try {
                const { chatId, content, messageType = "text", fileId } = data;

                // if (!chatId) return;

                // const chat = await Chat.findOne({
                //     _id: chatId,
                //     participants: socket.data.userId,
                // });

                // if (!chat) return;

                // if (messageType === "Text" && !content) return;

                // if (["image", "video", " audio", "file"].includes(messageType) && !fileId) return;

                // const message = await Message.create({
                //     chatId,
                //     senderId: socket.data.userId,
                //     content: content || `File: ${fileId}`,
                //     messageType,
                //     fileId: fileId || undefined,
                // });
                const populatedServiceMessage = await createMessage({
                    chatId,
                    senderId: socket.data.userId,
                    content,
                    messageType,
                    fileId,
                });

                socket.to(chatId).emit("message:new", populatedServiceMessage);
                socket.emit("message:sent", populatedServiceMessage);
            }
            catch (err) {
                socket.emit("message:error", {
                    error: "filed to send message:" + err,
                });
            }
        });
        socket.on("disconnect", () => {
            console.log("Client disconnected: ", socket.id);
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