import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URL;

// Connect to MongoDB function bna kr!

const connectDB = async () => {
  try {
    if (!uri) {
      console.error("You did not provide a correct MongoDB URL !");
      process.exit(1);
    }

    await mongoose.connect(uri, {
    });

    console.log("Connected to MongoDB !");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
