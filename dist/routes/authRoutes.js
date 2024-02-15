"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing controller functions for user authentication
const authController_1 = require("../controllers/authController");
// Importing express module
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Define routes for user registration and login
router.post('/register', authController_1.registerUser); // Route to handle user registration
router.post('/login', authController_1.loginUser); // Route to handle user login
// Exporting the router
exports.default = router;
