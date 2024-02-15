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
// Import the mongoose package to interact with MongoDB
const mongoose_1 = __importDefault(require("mongoose"));
// Define an asynchronous function to establish a connection to the MongoDB database
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Attempt to connect to MongoDB using the connection string provided in the environment variable MONGO_URI
        // The '!' after process.env.MONGO_URI asserts that MONGO_URI is not null or undefined, signaling to TypeScript
        // that you're confident it will be provided at runtime.
        const conn = yield mongoose_1.default.connect(process.env.MONGO_URI);
        // Log a success message including the host name of the MongoDB server to which the connection was established
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        // This catch block handles any errors that occur during the connection attempt
        // Perform a type check on the error to ensure it is an instance of the JavaScript Error class
        // This is necessary because TypeScript/JavaScript can throw any type of object, not just Error objects
        if (error instanceof Error) {
            // If it's an Error instance, log a custom error message including the error's message property
            console.error(`Error: ${error.message}`);
        }
        else {
            // If the caught object is not an Error instance, log a generic error message
            // This branch helps ensure that even non-Error throws are handled gracefully
            console.error('An unknown error occurred');
        }
        // Exit the Node.js process with a failure status code (1) to indicate that an unrecoverable error has occurred
        // This is a common pattern in Node.js applications to indicate to the environment (e.g., Docker containers,
        // CI pipelines) that the application cannot start or continue running due to the encountered error
        process.exit(1);
    }
});
// Export the connectDB function to be used in other parts of the application
// This allows for modularization of your database connection logic, making it reusable
// and easier to manage in larger applications
exports.default = connectDB;
