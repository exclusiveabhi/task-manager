// index.js or app.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'; // Adjust the path as necessary
import taskRoutes from './routes/taskRoutes.js'; // Adjust the path as necessary

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

// Use the auth routes
app.use('/api/auth', authRoutes); // Prefixing auth routes with /api/auth

// Use the task routes
app.use('/api', taskRoutes); // Prefixing task routes with /api

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));
