// Import the express module
import express from 'express';
import dotenv from 'dotenv'
import connectDB from "./libs/db.js"
import AuthRoutes from './routes/Auth.routes.js';
dotenv.config()
// Create an instance of an Express application
const app = express();
connectDB();
// Define a port to listen on
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());
app.use('/auth',AuthRoutes)
// Define a basic route
// app.get('/', (req, res) => {
//   res.send('Welcome to my Express server!');
// });


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});