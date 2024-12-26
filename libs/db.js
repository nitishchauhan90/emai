import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Destructure variables from process.env
// const { DB_URI, DB_USER, DB_PASSWORD } = process.env;

// Create the connection string
// const connectionString = DB_USER && DB_PASSWORD 
//   ? `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URI}` 
//   : DB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongodb_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connection successful!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;