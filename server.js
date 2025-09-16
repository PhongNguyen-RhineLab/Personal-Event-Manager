const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Phong2003!',
  database: 'fullcalendar',
});

db.connect((err) => {
  if (err) {
    console.error('Unable to connect to database:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database.');
});

// Serve static files (index.html, lib, etc.) from the project directory
app.use(express.static(path.join(__dirname)));

// Update event endpoint
app.post('/api/update-event', (req, res) => {
  const { id, title, start, end } = req.body;
  if (!id || !title || !start || !end) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  const sql = 'UPDATE events SET title=?, start=?, end=? WHERE id=?';
  db.query(sql, [title, start, end, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error.' });
    }
    res.json({ success: true });
  });
});

// Get all events
app.get('/api/events', (req, res) => {
  db.query('SELECT * FROM events', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error.' });
    }
    res.json(results);
  });
});

// Add new event
app.post('/api/add-event', (req, res) => {
  const { title, start, end } = req.body;
  if (!title || !start || !end) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  const sql = 'INSERT INTO events (title, start, end) VALUES (?, ?, ?)';
  db.query(sql, [title, start, end], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error.' });
    }
    res.json({ success: true, id: result.insertId });
  });
});

// Delete event
app.delete('/api/delete-event', (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'Missing event id.' });
  }
  db.query('DELETE FROM events WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error.' });
    }
    res.json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
