import jwt from "jsonwebtoken";

export interface TokenPayload {
    id: string;
    email: string;
    username: string;
}

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
    const token = jwt.sign(payload, process.env.JWT_SECRET || "access_secret", {
        expiresIn: "15m",
    });
    return token;
}

export const generateRefreshToken = (payload: TokenPayload): string => {
    const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || "refresh_secret", {
        expiresIn: "7d",
    });
    return token;
}

export const generateToekns = (payload: TokenPayload): TokenResponse => {
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    return { accessToken, refreshToken };
}

export const verifyAccessToken = (token: string): TokenPayload => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "access_secret");
    return decoded as TokenPayload;
}
export const verifyRefreshToken = (token: string): TokenPayload => {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || "refresh_secret");
    return decoded as TokenPayload;
}