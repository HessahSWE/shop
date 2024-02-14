import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db';
import userRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
