import mongoose from "mongoose";
import { MONGO_URL } from "./serverConfig.js";
const connectDB= async ()=>{
  try {
    await mongoose.connect(MONGO_URL);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
}

export default  connectDB;