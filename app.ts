import express, { Application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import serviceRouter from './Routs/ServiceRout';
import userRouter from './Routs/UserRout';
import authRouter from './Routs/AuthRout';
import businessRouter from './Routs/BusinessRout';
import { authenticateToken, authorizeRoles } from './Middlewares/AuthMiddleware';
import { error } from './Middlewares/ErrorMiddleware'
dotenv.config();

const app: Application = express();

const connectDB = async () => {
  try {
    const uri = process.env.MONGOOSE_URI;
    if (!uri) throw new Error('Missing MONGOOSE_URI in environment variables');
    await mongoose.connect(uri);
    console.log('Connected to DB');
  } catch (error) {
    console.error('DB Connection Error:', error);
  }
};

// Connect to DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRouter);
app.use('/service', authenticateToken, serviceRouter);
app.use('/user', authenticateToken,  userRouter);
app.use('/business', authenticateToken, authorizeRoles('admin'), businessRouter);
app.use(error)

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
