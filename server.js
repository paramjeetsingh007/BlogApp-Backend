const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:3000", // Allow local development
  "https://blog-app-frontend-puce-alpha.vercel.app" // Allow deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));


// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Default route
app.get("/", (req, res) => {
    res.send("Backend is running successfully!");
});

// API routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);

// Define the port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
