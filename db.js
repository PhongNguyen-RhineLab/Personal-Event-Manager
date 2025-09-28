// Load environment variables at the top
require('dotenv').config();
const mysql = require('mysql2/promise');

// Database configuration using environment variables
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fullcalendar',
  port: process.env.DB_PORT || 3306,
  charset: 'utf8mb4'
};

// Create connection pool for better performance
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to initialize the database and create tables
async function initializeDatabase() {
  try {
    // First connection to create database
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      port: dbConfig.port
    });

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    await connection.end();

    // Second connection to the specific database
    const dbConnection = await mysql.createConnection(dbConfig);

    // Create events table with proper column names (only if it doesn't exist)
    await dbConnection.execute(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        start DATETIME NOT NULL,
        end DATETIME,
        allDay BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Insert sample event only if table is empty
    const [rows] = await dbConnection.execute('SELECT COUNT(*) as count FROM events');
    if (rows[0].count === 0) {
      await dbConnection.execute(`
        INSERT INTO events (title, start, end, allDay) 
        VALUES (?, ?, ?, ?)
      `, ['Sample Event', '2025-09-17 10:00:00', '2025-09-17 12:00:00', false]);
    }

    await dbConnection.end();
    console.log('Database initialized successfully');
    console.log(`Connected to database: ${dbConfig.database} on ${dbConfig.host}`);
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

module.exports = {
  pool,
  initializeDatabase
};