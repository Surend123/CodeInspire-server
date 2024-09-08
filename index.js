import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './database/db.js';
import Razorpay from 'razorpay';
import cors from 'cors';

const app = express();

// Initialize Razorpay instance
export const instance = new Razorpay({
    key_id: process.env.Razorpay_Key,
    key_secret: process.env.Razorpay_Secret,
});

// Middleware
app.use(express.json());
app.use(cors());

// Static files
app.use('/uploads', express.static('uploads'));

// Database connection and server start
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port:${process.env.PORT || 8000}`);
        });
    })
    .catch((err) => {
        console.log('MongoDB connection failed !!!', err);
    });

// Routes
import userRoutes from './routes/user.js';
import courseRoutes from './routes/course.js';
import adminRoutes from './routes/admin.js';

app.use('/api', userRoutes);
app.use('/api', courseRoutes);
app.use('/api', adminRoutes);
