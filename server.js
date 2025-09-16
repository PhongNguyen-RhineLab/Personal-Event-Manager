const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

// In-memory storage for events (in production, you'd use a database)
let events = [
  {
    id: 1,
    title: 'Sample Event',
    start: '2025-09-17T10:00:00',
    end: '2025-09-17T12:00:00',
    allDay: false
  }
];

let nextId = 2;

// API Routes

// Get all events
app.get('/api/events', (req, res) => {
  console.log('GET /api/events - Fetching all events');
  res.json(events);
});

// Add new event
app.post('/api/add-event', (req, res) => {
  console.log('POST /api/add-event - Adding new event:', req.body);

  const { title, start, end, allDay } = req.body;

  if (!title || !start) {
    return res.status(400).json({ error: 'Title and start date are required' });
  }

  const newEvent = {
    id: nextId++,
    title: title,
    start: start,
    end: end || start,
    allDay: allDay || false
  };

  events.push(newEvent);
  console.log('Event added successfully:', newEvent);
  res.json({ success: true, event: newEvent });
});

// Update event (for drag/drop and resize)
app.post('/api/update-event', (req, res) => {
  console.log('POST /api/update-event - Updating event:', req.body);

  const { id, title, start, end } = req.body;

  const eventIndex = events.findIndex(event => event.id == id);

  if (eventIndex === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }

  // Update the event
  events[eventIndex] = {
    ...events[eventIndex],
    title: title || events[eventIndex].title,
    start: start || events[eventIndex].start,
    end: end || events[eventIndex].end
  };

  console.log('Event updated successfully:', events[eventIndex]);
  res.json({ success: true, event: events[eventIndex] });
});

// Delete event
app.delete('/api/delete-event', (req, res) => {
  console.log('DELETE /api/delete-event - Deleting event with ID:', req.body.id);

  const { id } = req.body;

  const eventIndex = events.findIndex(event => event.id == id);

  if (eventIndex === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }

  const deletedEvent = events.splice(eventIndex, 1)[0];
  console.log('Event deleted successfully:', deletedEvent);
  res.json({ success: true, deletedEvent });
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Available API endpoints:');
  console.log('- GET /api/events');
  console.log('- POST /api/add-event');
  console.log('- POST /api/update-event');
  console.log('- DELETE /api/delete-event');
});

module.exports = app;
