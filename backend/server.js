import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import bookRouter from "./routes/books.js";

connectDB();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true, 
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Add a root route handler
app.get("/", (req, res) => {
  res.status(200).json({ message: "API Working" });
});

// Routes
app.use("/api/v1", bookRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});