// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/authRoutes'; // Import routes for user authentication
import productRoutes from './routes/productRoutes'; // Import routes for products

// Function to connect to MongoDB database
const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1); // Exit the process with an error code
  }
};

// Connect to MongoDB
connectDB();

// Create an Express application
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Route handling
app.use('/api/users', userRoutes); // User authentication routes
app.use('/api/products', productRoutes); // Product routes

// Define the port for the server to listen on
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
