"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.MONGO_URI = exports.PORT = void 0;
exports.PORT = process.env.PORT || 3000;
exports.MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://shop3:mUsAiLQHNE3g8Vnw@cluster3.u0kmedr.mongodb.net/?retryWrites=true&w=majority';
exports.JWT_SECRET = process.env.JWT_SECRET || 'coding';
