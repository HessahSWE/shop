import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";

const registerUser = async (req: Request, res: Response) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  try {
    // Check if a user with the given email already exists
    const userExists = await User.findOne({ email });

    // If user exists, return an error response
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user with the provided email and hashed password
    const user = User.build({
      email: email.toLowerCase(), // Ensures email is stored in lowercase
      password: await bcrypt.hash(password, 10), // Hashes the password
    });
    await user.save(); // Save the user to the database

    // Respond with the new user's ID, email, and a generated token
    res.status(201).json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register user" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Find the user by their email
    const user = await User.findOne({ email: email.toLowerCase() });

    // If user not found, return an error response
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Respond with user ID, email, and a generated token if password matches
    res.status(200).json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to log in" });
  }
};


const generateToken = (id: string) => {
  try {
    // Generate a JWT token with the user's ID as the payload
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
      expiresIn: "30d", // Set the token to expire in 30 days
    });
  } catch (error) {
    throw new Error("Failed to generate authentication token.");
  }
};


export { loginUser, registerUser };
