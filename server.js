const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// ✅ Configure CORS properly
app.use(
    cors({
        origin: "https://blog-app-frontend-puce-alpha.vercel.app", // Allow frontend domain
        methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
        allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
        credentials: true, // If using cookies or authentication tokens
    })
);

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
    res.send("Backend is running successfully!");
});

app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/blog", require("./routes/blogRoutes"));

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
