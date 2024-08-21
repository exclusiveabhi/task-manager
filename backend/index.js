import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'; // Adjust the path as necessary

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));

app.use(express.json());

// Use the auth routes
app.use(authRoutes);

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB !');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));
