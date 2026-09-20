import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { db } from "../db/index.js";
import { users } from "../models/user.model.js";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// -----------------------------------------------------------------------------
// BUSINESS LOGIC: Token Generation
// -----------------------------------------------------------------------------
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (!user) {
      throw new ApiError(404, "User not found for token generation");
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d" }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "10d" }
    );

    // Save refresh token back to Neon PostgreSQL
    await db
      .update(users)
      .set({ refreshToken, updatedAt: new Date() })
      .where(eq(users.id, userId));

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh tokens"
    );
  }
};

// -----------------------------------------------------------------------------
// CONTROLLER: Register User
// -----------------------------------------------------------------------------
export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  if (
    [fullName, email, username, password].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const normalizedEmail = email.toLowerCase().trim();
  const normalizedUsername = username.toLowerCase().trim();

  // 1. Check existing user
  const existingUser = await db
    .select()
    .from(users)
    .where(
      or(
        eq(users.email, normalizedEmail),
        eq(users.username, normalizedUsername)
      )
    );

  if (existingUser.length > 0) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // 2. Business Logic: Explicit Password Hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Database Execution: Insert and Return Created User
  const [createdUser] = await db
    .insert(users)
    .values({
      fullName: fullName.trim(),
      email: normalizedEmail,
      username: normalizedUsername,
      password: hashedPassword,
    })
    .returning({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      username: users.username,
      createdAt: users.createdAt,
    });

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});


//Login User

export const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!email && !username) {
    throw new ApiError(400, "Username or email is required");
  }

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const identifier = (email || username).toLowerCase().trim();

  // 1. Fetch user from Neon DB
  const [user] = await db
    .select()
    .from(users)
    .where(
      or(eq(users.email, identifier), eq(users.username, identifier))
    );

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  // 2. Business Logic: Password Validation
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  // 3. Generate tokens & persist refresh token
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user.id
  );

  // 4. Strip sensitive data before responding
  const { password: _, refreshToken: __, ...loggedInUser } = user;

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

//Logout User
export const logoutUser = asyncHandler(async (req, res) => {
  // Clear refresh token in Neon DB
  await db
    .update(users)
    .set({ refreshToken: null, updatedAt: new Date() })
    .where(eq(users.id, req.user.id));

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});



//Get Current User
export const getCurrentUser =  asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(200, req.user, "current user fetched successfully"))
})