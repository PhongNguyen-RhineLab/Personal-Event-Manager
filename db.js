const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Phong2003!',
  database: 'fullcalendar',
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
      password: dbConfig.password
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
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

module.exports = {
  pool,
  initializeDatabase
};
