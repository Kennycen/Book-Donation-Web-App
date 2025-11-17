import express from 'express';
import cors from 'cors';
import "dotenv/config"
import connectDB from './config/db.js';
import bookRouter from './routes/books.js';

connectDB();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true, // Allow credentials
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Add this near the top after creating 'app'
// if (process.env.NODE_ENV === 'production') {
//   app.use((req, res, next) => {
//     if (req.headers['x-forwarded-proto'] !== 'https') {
//       res.redirect(`https://${req.headers.host}${req.url}`);
//     } else {
//       next();
//     }
//   });
// }

// Add a root route handler
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API Working' });
});

// Health check endpoint
// app.get('/health', (req, res) => {
//   res.status(200).json({ status: 'ok' });
// });

// Routes
app.use('/api/v1', bookRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
});

// Global Error Handler
// app.use((err, req, res, next) => {
//   console.error('Unhandled error:', err);
//   res.status(500).json({
//     error: 'Something went wrong!',
//     details: process.env.NODE_ENV === 'development' ? err.message : undefined,
//   });
// });

// Start server only after DB connection
// const startServer = async () => {
//   try {
//     await connectDB();
//     if (process.env.NODE_ENV !== 'production') {
//       const PORT = process.env.PORT || 4000;
//       app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//     }
//   } catch (error) {
//     console.error('Failed to start server:', error);
//     process.exit(1);
//   }
// };

// startServer();

// export default app;