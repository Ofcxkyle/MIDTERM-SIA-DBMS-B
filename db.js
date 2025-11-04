import mysql from 'mysql2/promise';
import 'dotenv/config'; // This line reads your .env file!

// This object is now built from your .env file
const dbConfig = {
  host: process.env.DB_HOST,     // Gets 'localhost' from .env
  user: process.env.DB_USER,     // Gets 'root' from .env
  password: process.env.DB_PASSWORD, // Gets 'kyle123' from .env
  database: process.env.DB_NAME,   // Gets 'my_app_db' from .env
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

/**
 * Tests the database connection.
 */
export const testDbConnection = async () => {
  try {
    // Database connection is established
    const connection = await pool.getConnection();
    console.log('✅ Database connection successful!');
    connection.release();
  } catch (error) {
    // Error handling for DB connection is implemented
    console.error('❌ Database connection failed:', error.message);
    process.exit(1); // Exit the process if DB connection fails
  }
};

// Export the pool for use in other files
export default pool;