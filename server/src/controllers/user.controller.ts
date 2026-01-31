import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import User from "../models/User";
import ApiError from "../utils/ApiError";


// Create a new user
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



// Get all the users
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find().select("-password -__v");

    res.status(200).json({
        success: true,
        message: "Users fetched sucessfully",
        data: users,
    });
}
)


// Gets specific use by its ID
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


// Update the existing user with all the constrain
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, email } = req.body;

    if (!id) {
        throw new ApiError(400, "User ID is required");
    }
    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (email && email !== user.email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ApiError(409, "User with this email already exists")
        }
    }

    const updateUser = await User.findByIdAndUpdate(
        id,
        { username, email },
        { new: true, runValidators: true }
    ).select("-password -__v");

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updateUser
    })
})


// Operation to delete the user

export const deletUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, "User ID is required")
    }

    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: null,
    })
})