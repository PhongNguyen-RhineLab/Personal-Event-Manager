const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { pool, initializeDatabase } = require('./db');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

// Initialize database on startup
initializeDatabase().catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

// API Routes

// Get all events
app.get('/api/events', async (req, res) => {
  console.log('GET /api/events - Fetching all events');
  try {
    const [rows] = await pool.execute('SELECT * FROM events ORDER BY start ASC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Add new event
app.post('/api/add-event', async (req, res) => {
  console.log('POST /api/add-event - Adding new event:', req.body);

  const { title, start, end, allDay } = req.body;

  if (!title || !start) {
    return res.status(400).json({ error: 'Title and start date are required' });
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO events (title, start, end, allDay) VALUES (?, ?, ?, ?)',
      [title, start, end || start, allDay || false]
    );

    const newEvent = {
      id: result.insertId,
      title: title,
      start: start,
      end: end || start,
      allDay: allDay || false
    };

    console.log('Event added successfully:', newEvent);
    res.json({ success: true, event: newEvent });
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ error: 'Failed to add event' });
  }
});

// Update event (for drag/drop and resize)
// Improved update-event endpoint
app.post('/api/update-event', async (req, res) => {
  const { id, title, start, end, allDay } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Event ID is required' });
  }

  try {
    const [currentEvent] = await pool.execute('SELECT * FROM events WHERE id = ?', [id]);

    if (currentEvent.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const current = currentEvent[0];
    const isAllDay = allDay !== undefined ? allDay : current.allDay;

    const updatedData = {
      title: title || current.title,
      start: start ? formatDateForMySQL(start, isAllDay) : current.start,
      end: end ? formatDateForMySQL(end, isAllDay) : current.end,
      allDay: isAllDay
    };

    await pool.execute(
        'UPDATE events SET title = ?, start = ?, end = ?, allDay = ? WHERE id = ?',
        [updatedData.title, updatedData.start, updatedData.end, updatedData.allDay, id]
    );

    res.json({ success: true, event: { id: parseInt(id), ...updatedData } });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({
      error: 'Failed to update event',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Delete event
app.delete('/api/delete-event', async (req, res) => {
  console.log('DELETE /api/delete-event - Deleting event with ID:', req.body.id);

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Event ID is required' });
  }

  try {
    // First, get the event to return it
    const [event] = await pool.execute('SELECT * FROM events WHERE id = ?', [id]);

    if (event.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Delete the event
    await pool.execute('DELETE FROM events WHERE id = ?', [id]);

    console.log('Event deleted successfully:', event[0]);
    res.json({ success: true, deletedEvent: event[0] });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Add to server.js
function formatDateForMySQL(dateStr, isAllDay = false) {
  if (!dateStr) return null;

  // Handle different input formats
  if (isAllDay) {
    // Ensure YYYY-MM-DD format for all-day events
    return dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
  } else {
    // Ensure YYYY-MM-DD HH:mm:ss format for timed events
    if (!dateStr.includes(':')) {
      return dateStr + ' 00:00:00';
    }
    if (!dateStr.includes(' ')) {
      return dateStr + ':00';
    }
    return dateStr.length === 16 ? dateStr + ':00' : dateStr;
  }
}
module.exports = app;
