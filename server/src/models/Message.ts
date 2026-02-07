import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
    chatId: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    content: string;
    messageType: "text" | "image" | "video" | "audio" | "file";
    fileId?: string;
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new Schema<IMessage>({
    chatId: {
        type: Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    messageType: {
        type: String,
        enum: ["text", "image", "video", "audio", "file"],
        default: "text"
    },
    fileId: {
        type: String,
    }
}, { timestamps: true });


const Message = mongoose.model<IMessage>("Message", messageSchema);
export default Message;