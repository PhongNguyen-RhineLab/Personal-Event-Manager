# Personal Event Management System

A modern, interactive calendar application built with FullCalendar.js that allows users to create, edit, delete, and manage events with a beautiful, responsive user interface. The application features Vietnamese localization and supports both MySQL database storage and real-time event management.

## Features

- **Interactive Calendar Views**: Month, week, and day views with smooth navigation
- **Event Management**: Create, edit, delete, and drag-and-drop events
- **All-Day & Timed Events**: Support for both all-day and time-specific events
- **Beautiful UI**: Modern gradient design with hover effects and animations
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Real-time Updates**: Events are persisted on the server and updated in real-time
- **Drag & Drop**: Move events between dates by dragging
- **Event Resizing**: Resize events to change duration (in week/day views)
- **Vietnamese Localization**: Full Vietnamese language support for months, days, and buttons
- **MySQL Database**: Persistent storage with MySQL database integration

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript, jQuery
- **Calendar Library**: FullCalendar.js v3
- **UI Components**: jQuery UI
- **Date Handling**: Moment.js
- **Backend**: Node.js with Express (server.js)
- **Database**: MySQL with mysql2 driver
- **Package Manager**: npm

## Project Structure

```
fullcalendar/
├── index.html              # Main HTML file with Vietnamese calendar interface
├── server.js              # Express server with API endpoints
├── db.js                  # MySQL database configuration and initialization
├── package.json           # Project dependencies
├── README.md              # Project documentation
└── lib/                   # Client-side libraries
    ├── fullcalendar.js         # FullCalendar library
    ├── fullcalendar.min.css    # FullCalendar styles
    ├── fullcalendar.min.js     # Minified FullCalendar
    ├── fullcalendar.print.css  # Print styles
    ├── jquery-ui.custom.min.js # jQuery UI components
    ├── jquery.min.js           # jQuery library
    └── moment.min.js           # Moment.js for date handling
```

## Prerequisites

- **Node.js** (v12 or higher)
- **MySQL** server running
- **npm** (comes with Node.js)

## Installation

1. **Clone or download the project**:
   ```bash
   cd C:\Users\84389\WebstormProjects\fullcalendar
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up MySQL database**:
   - Make sure MySQL server is running
   - The application will automatically create the database and events table on first run
   - Default database configuration in `db.js`:
     - Host: localhost
     - User: root
     - Password: (empty)
     - Database: fullcalendar_db

4. **Configure database connection** (if needed):
   - Edit `db.js` file to modify MySQL connection settings

## Usage

1. **Start the server**:
   ```bash
   node server.js
   ```

2. **Open the application**:
   - Open your web browser
   - Navigate to: `http://localhost:3000`
   - Or directly open `index.html` in your browser

3. **Using the calendar**:
   - **View Events**: Switch between month (Tháng), week (Tuần), and day (Ngày) views
   - **Create Events**: Click on any date or time slot to create a new event
   - **Edit Events**: Click on existing events to modify them
   - **Move Events**: Drag and drop events to different dates
   - **Delete Events**: Use the delete option when editing events

## API Endpoints

The server provides REST API endpoints for event management:

- **GET** `/api/events` - Retrieve all events
- **POST** `/api/events` - Create a new event
- **PUT** `/api/events/:id` - Update an existing event
- **DELETE** `/api/events/:id` - Delete an event

### Event Data Structure

```json
{
  "id": 1,
  "title": "Event Title",
  "start": "2025-09-25T10:00:00",
  "end": "2025-09-25T12:00:00",
  "allDay": false,
  "color": "#3788d8"
}
```

## Vietnamese Localization

The application includes full Vietnamese language support:

- **Months**: Tháng 1, Tháng 2, ..., Tháng 12
- **Days**: Chủ nhật, Thứ hai, Thứ ba, Thứ tư, Thứ năm, Thứ sáu, Thứ bảy
- **Buttons**: Hôm nay (Today), Tháng (Month), Tuần (Week), Ngày (Day)
- **Short names**: T2, T3, T4, T5, T6, T7, CN

## Troubleshooting

1. **Server won't start**:
   - Check if MySQL is running
   - Verify database connection settings in `db.js`
   - Ensure port 3000 is not in use

2. **Events not loading**:
   - Check browser console for errors
   - Verify API endpoints are responding (visit `http://localhost:3000/api/events`)

3. **Database connection issues**:
   - Confirm MySQL credentials in `db.js`
   - Check if MySQL service is running
   - Verify database permissions

## Development

To modify the calendar appearance or functionality:

1. **Frontend changes**: Edit `index.html`
2. **Server logic**: Modify `server.js`
3. **Database schema**: Update `db.js`
4. **Styling**: Customize CSS in the `<style>` section of `index.html`

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions, please check the troubleshooting section above or refer to the FullCalendar.js documentation at [fullcalendar.io](https://fullcalendar.io/).
