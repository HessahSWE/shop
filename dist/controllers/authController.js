"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract email and password from request body
    const { email, password } = req.body;
    try {
        // Check if a user with the given email already exists
        const userExists = yield userModel_1.User.findOne({ email });
        // If user exists, return an error response
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Create a new user with the provided email and hashed password
        const user = userModel_1.User.build({
            email: email.toLowerCase(), // Ensures email is stored in lowercase
            password: yield bcryptjs_1.default.hash(password, 10), // Hashes the password
        });
        yield user.save(); // Save the user to the database
        // Respond with the new user's ID, email, and a generated token
        res.status(201).json({
            _id: user.id,
            email: user.email,
            token: generateToken(user._id),
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to register user" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Find the user by their email
        const user = yield userModel_1.User.findOne({ email: email.toLowerCase() });
        // If user not found, return an error response
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // Compare the provided password with the stored hashed password
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // Respond with user ID, email, and a generated token if password matches
        res.status(200).json({
            _id: user.id,
            email: user.email,
            token: generateToken(user._id),
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to log in" });
    }
});
exports.loginUser = loginUser;
const generateToken = (id) => {
    try {
        // Generate a JWT token with the user's ID as the payload
        return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: "30d", // Set the token to expire in 30 days
        });
    }
    catch (error) {
        throw new Error("Failed to generate authentication token.");
    }
};
