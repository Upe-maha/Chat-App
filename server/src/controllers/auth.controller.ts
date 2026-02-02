import { Request, Response } from "express";
import User from "../models/User";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import { hashPassword, comparePassword } from "../utils/hashPassword";
import { generateAccessToken, generateTokens, verifyRefreshToken } from "../utils/jwt";

// user registration || creation
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new ApiError(400, "Username, email and password are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    const userResponse = user.toObject();
    const { password: _, ...userWithoutPassword } = userResponse;

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: userWithoutPassword,
    });
});

// user login
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid email or password");
    }

    const { accessToken, refreshToken } = generateTokens({
        id: user._id.toString(),
        email: user.email,
        username: user.username,
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const userResponse = user.toObject();
    const { password: _, ...userWithoutPassword } = userResponse;

    res.status(200).json({
        success: true,
        message: "Login successful",
        accessToken,
        data: userWithoutPassword,
    });
});

// accessToken generation using refresh token
export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
        throw new ApiError(401, "Refresh token not provided");
    }
    const payload = verifyRefreshToken(refreshToken);

    const accessToken = generateAccessToken({
        id: payload.id,
        email: payload.email,
        username: payload.username,
    });
    res.status(200).json({
        success: true,
        accessToken,
    });
})

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    })
});