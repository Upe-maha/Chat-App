import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import User from "../models/User";
import ApiError from "../utils/ApiError";


export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new ApiError(400, "Name, email and password are required")
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    const user = await User.create({
        username,
        email,
        password,
    })

    // Remove password from response
    const userResponse = user.toObject();
    const { password: _, ...userWithoutPassword } = userResponse;

    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: userWithoutPassword,
    });
})



export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find().select("-password -__v");

    res.status(200).json({
        success: true,
        message: "Users fetched sucessfully",
        data: users,
    });
}
)



export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findById(id).select("-password -__v");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user,
    });
});
