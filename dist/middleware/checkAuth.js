"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const SECRET_KEY = process.env.JWT_SECRET || 'coding';
const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1]; // Extract token from Bearer scheme
    if (!token) {
        return res.status(401).send('No token provided');
    }
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).send('Token is invalid or expired');
        }
        // Attach decoded token (user payload) to request object
        req.body = decoded;
        next();
    });
};
exports.checkAuth = checkAuth;
