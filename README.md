# 📅 FullCalendar Event Management System

<div align="center">

![Calendar](https://img.shields.io/badge/Calendar-FullCalendar-blue?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

*A modern, interactive calendar application with Vietnamese localization and real-time event management*

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [API](#-api-endpoints) • [Contributing](#-contributing)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🗓️ **Calendar Views**
- 📊 Month, Week, and Day views
- 🎯 Smooth navigation between dates
- 📱 Responsive design for all devices
- 🌏 Vietnamese localization

</td>
<td width="50%">

### ⚡ **Event Management**
- ➕ Create new events
- ✏️ Edit existing events
- 🗑️ Delete events
- 🎨 Drag & drop functionality

</td>
</tr>
<tr>
<td width="50%">

### 🎨 **User Interface**
- 🌈 Modern gradient design
- ✨ Smooth animations
- 🖱️ Hover effects
- 📐 Clean typography

</td>
<td width="50%">

### 💾 **Data Management**
- 🔄 Real-time updates
- 💿 MySQL database storage
- 🔄 Event persistence
- 📊 RESTful API

</td>
</tr>
</table>

---

## 🚀 Demo

### 📸 Screenshots

> **Note:** Add screenshots of your calendar application here to showcase the UI

### 🎯 Key Functionalities

- **📅 Multi-view Calendar**: Switch between month, week, and day views
- **🖱️ Drag & Drop**: Move events between dates effortlessly
- **📏 Event Resizing**: Adjust event duration in week/day views
- **⏰ All-day Events**: Support for both timed and all-day events
- **🇻🇳 Vietnamese Interface**: Fully localized for Vietnamese users

---

## 🛠️ Technology Stack

<div align="center">

| Frontend | Backend | Database | Tools |
|----------|---------|----------|-------|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) | ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white) | ![npm](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white) |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) | ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white) | ![mysql2](https://img.shields.io/badge/mysql2-4479A1?style=flat-square&logo=mysql&logoColor=white) | ![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=flat-square&logo=nodemon&logoColor=white) |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | ![CORS](https://img.shields.io/badge/CORS-FF6B6B?style=flat-square) | | ![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=flat-square) |
| ![jQuery](https://img.shields.io/badge/jQuery-0769AD?style=flat-square&logo=jquery&logoColor=white) | ![Body Parser](https://img.shields.io/badge/Body--Parser-000000?style=flat-square) | | |
| ![FullCalendar](https://img.shields.io/badge/FullCalendar-FF6B35?style=flat-square) | | | |
| ![Moment.js](https://img.shields.io/badge/Moment.js-4A154B?style=flat-square) | | | |

</div>

---

## 📁 Project Structure

```
📦 fullcalendar/
├── 📄 index.html              # Main application interface
├── 🚀 server.js              # Express server with API routes
├── 🗄️ db.js                  # MySQL database configuration
├── 📋 package.json           # Project dependencies & scripts
├── 📖 README.md              # Project documentation
├── 📜 LICENSE                # License file
└── 📁 lib/                   # Client-side libraries
    ├── 📅 fullcalendar.js         # FullCalendar core library
    ├── 🎨 fullcalendar.min.css    # Calendar styling
    ├── ⚡ fullcalendar.min.js     # Minified FullCalendar
    ├── 🖨️ fullcalendar.print.css  # Print-specific styles
    ├── 🔧 jquery-ui.custom.min.js # jQuery UI components
    ├── 💫 jquery.min.js           # jQuery library
    └── ⏰ moment.min.js           # Date/time handling
```

---

## 🚀 Installation

### Prerequisites

Make sure you have the following installed:

- ![Node.js](https://img.shields.io/badge/Node.js-v12+-339933?style=flat-square&logo=nodedotjs&logoColor=white)
- ![MySQL](https://img.shields.io/badge/MySQL-Server-4479A1?style=flat-square&logo=mysql&logoColor=white)
- ![npm](https://img.shields.io/badge/npm-Package%20Manager-CB3837?style=flat-square&logo=npm&logoColor=white)

### Quick Start

1. **📥 Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd fullcalendar
   ```

2. **📦 Install dependencies**
   ```bash
   npm install
   ```

3. **🗄️ Setup MySQL Database**
   ```sql
   CREATE DATABASE calendar_db;
   ```

4. **⚙️ Configure Environment**
   Create a `.env` file in the root directory:
   ```env
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=calendar_db
   PORT=3000
   ```

5. **🚀 Start the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

6. **🌐 Open in browser**
   Navigate to `http://localhost:3000`

---

## 📖 Usage

### 🎯 Basic Operations

| Action | Method | Description |
|--------|--------|-------------|
| **View Events** | Click on calendar | Browse events in month/week/day view |
| **Create Event** | Click on date/time slot | Add new events with title and timing |
| **Edit Event** | Click on existing event | Modify event details |
| **Move Event** | Drag & drop | Change event date/time |
| **Resize Event** | Drag event edges | Adjust event duration |
| **Delete Event** | Event context menu | Remove unwanted events |

### 🎨 Interface Features

- **🌏 Vietnamese Localization**: All interface elements in Vietnamese
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **🎨 Modern UI**: Gradient backgrounds and smooth animations
- **🖱️ Interactive Elements**: Hover effects and visual feedback

---

## 🔌 API Endpoints

### 📊 Events API

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `GET` | `/api/events` | Fetch all events | None |
| `POST` | `/api/add-event` | Create new event | `title`, `start`, `end`, `allDay` |
| `POST` | `/api/update-event` | Update existing event | `id`, `title`, `start`, `end`, `allDay` |
| `DELETE` | `/api/delete-event` | Remove event | `id` |

### 📝 Request Examples

**Create Event:**
```javascript
fetch('/api/add-event', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Meeting with Team',
    start: '2025-09-30T10:00:00',
    end: '2025-09-30T11:00:00',
    allDay: false
  })
});
```

**Update Event:**
```javascript
fetch('/api/update-event', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: 1,
    title: 'Updated Meeting',
    start: '2025-09-30T14:00:00',
    end: '2025-09-30T15:00:00'
  })
});
```

---

## 🗄️ Database Schema

```sql
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  start DATETIME NOT NULL,
  end DATETIME,
  allDay BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 🛠️ Development

### 📝 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Start production server
npm start

# Start with custom environment
npm run prod
```

### 🔧 Development Setup

1. **Install dev dependencies**
   ```bash
   npm install --dev
   ```

2. **Enable development mode**
   ```bash
   npm run dev
   ```

3. **File watching**: Nodemon automatically restarts the server on file changes

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🚀 How to Contribute

1. **🍴 Fork the repository**
2. **🌿 Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **💾 Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **📤 Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **🔄 Open a Pull Request**

### 📋 Development Guidelines

- ✅ Follow existing code style
- 📝 Add comments for complex logic
- 🧪 Test your changes thoroughly
- 📖 Update documentation as needed

---

## 📋 Todo / Roadmap

- [ ] 🔐 User authentication system
- [ ] 👥 Multi-user event sharing
- [ ] 🔔 Event notifications
- [ ] 📱 Mobile app version
- [ ] 🌐 Multiple language support
- [ ] 📊 Event analytics dashboard
- [ ] 🔄 Event synchronization with external calendars
- [ ] 📎 File attachments for events
- [ ] 🏷️ Event categories and tags
- [ ] 🔍 Advanced search functionality

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **FullCalendar.js** - Amazing calendar library
- **Express.js** - Fast web framework for Node.js
- **MySQL** - Reliable database system
- **jQuery** - Simplifying JavaScript operations
- **Moment.js** - Date/time manipulation

---

## 📞 Contact & Support

<div align="center">

**Found a bug?** [Open an issue](../../issues)
**Have a question?** [Start a discussion](../../discussions)
**Want to contribute?** [Submit a pull request](../../pulls)

---

**⭐ Star this repository if you found it helpful!**

</div>
