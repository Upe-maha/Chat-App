import mongoose, { Document, Schema, } from "mongoose";

export interface IChat extends Document {
    name: string;
    description?: string;
    participants: mongoose.Types.ObjectId[];
    createdBy: mongoose.Types.ObjectId;
    isGroup: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const chatSchema = new Schema<IChat>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isGroup: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });

const Chat = mongoose.model<IChat>('Chat', chatSchema);
export default Chat;