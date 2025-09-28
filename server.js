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
app.post('/api/update-event', async (req, res) => {
  console.log('POST /api/update-event - Updating event:', req.body);

  const { id, title, start, end } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Event ID is required' });
  }

  try {
    // First, get the current event
    const [currentEvent] = await pool.execute('SELECT * FROM events WHERE id = ?', [id]);

    if (currentEvent.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Update the event with provided values or keep existing ones
    const updatedTitle = title || currentEvent[0].title;
    const updatedStart = start || currentEvent[0].start;
    const updatedEnd = end || currentEvent[0].end;

    await pool.execute(
      'UPDATE events SET title = ?, start = ?, end = ? WHERE id = ?',
      [updatedTitle, updatedStart, updatedEnd, id]
    );

    const updatedEvent = {
      id: parseInt(id),
      title: updatedTitle,
      start: updatedStart,
      end: updatedEnd,
      allDay: currentEvent[0].allDay
    };

    console.log('Event updated successfully:', updatedEvent);
    res.json({ success: true, event: updatedEvent });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
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

module.exports = app;
