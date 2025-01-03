import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import booksRouter from './routes/books.js';

dotenv.config();

const app = express();

// Update CORS configuration to handle multiple origins
const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://localhost:5173',
    'https://your-frontend-domain.vercel.app'
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use('/api', booksRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Something went wrong!',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server only after DB connection
const startServer = async () => {
  try {
    await connectDB();
    // Only start listening if not in Vercel environment
    if (process.env.NODE_ENV !== 'production') {
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Add this for Vercel serverless deployment
export default app;