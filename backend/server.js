import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import booksRouter from './routes/books.js';

dotenv.config();

const app = express();

// CORS setup with multiple origins
const allowedOrigins = [
  'https://book-donation-frontend-3mont270n.vercel.app', // Your frontend URL
  'http://localhost:5173',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS not allowed'));
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
}));
app.use(express.json());

// Add this near the top after creating 'app'
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      res.redirect(`https://${req.headers.host}${req.url}`);
    } else {
      next();
    }
  });
}

// Add a root route handler
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API Working' });
});

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

// Make sure this is at the end of the file
export default app;