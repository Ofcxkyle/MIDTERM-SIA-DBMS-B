import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // Make sure this is imported
import apiRoutes from './routes.js';
import { testDbConnection } from './db.js';

// Create the app
const app = express();

// This will now use the 3001 from your .env file
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API Server!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  // Test the database connection on startup
  testDbConnection();
});