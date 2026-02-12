import { Socket } from "socket.io";
import { verifyAccessToken } from "../utils/jwt";


export const socketAuthMiddleware = (socket: Socket, next: (err?: Error) => void) => {
    try {
        const authHeader = socket.handshake.headers.authorization;
        if (!authHeader) {
            return next(new Error("Unauthorized: No token provided"));
        }
        const tokenFromHeader = authHeader?.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : null;

        const token = socket.handshake.auth?.token || tokenFromHeader;
        if (!token) {
            return next(new Error("Unauthorized: Invalid token format"));
        }

        const payload = verifyAccessToken(token);
        if (!payload) {
            return next(new Error("Unauthorized: Invalid token"));
        }
        socket.data.userId = payload?.id;//|| payload?._id || payload?.userId;
        return next();
    }
    catch (err) {
        return next(new Error("Unauthorized: " + err));
    }
}