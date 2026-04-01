# Task-3: Collaborative Whiteboard

A real-time collaboration tool where multiple users can draw together on a shared whiteboard using WebSockets.

## Features

- 🎨 Real-time collaborative drawing
- 👥 Multi-user support with live cursors
- ✏️ Pen tool with customizable colors and brush sizes
- 🧹 Eraser tool
- ↩️ Undo functionality
- 🗑️ Clear canvas option
- 👀 See other users' cursors in real-time
- 📱 Touch support for mobile devices

## Project Structure

```
Task-3/
├── server/           # Backend (Node.js + Express + Socket.IO)
│   ├── index.js      # WebSocket server
│   └── package.json
│
└── client/           # Frontend (React + Vite)
    └── src/
        ├── components/
        │   ├── JoinForm.jsx     # Username entry
        │   ├── Whiteboard.jsx   # Main canvas component
        │   └── *.css
        ├── socket.js            # Socket.IO client config
        └── App.jsx
```

## Getting Started

### 1. Start the Server

```bash
cd Task-3/server
npm install
npm start
```

Server runs on `http://localhost:3002`

### 2. Start the Client

```bash
cd Task-3/client
npm install
npm run dev
```

Client runs on `http://localhost:5174`

### 3. Collaborate!

1. Open the app in multiple browser tabs/windows
2. Enter different usernames for each
3. Start drawing together in real-time!

## Technologies Used

- **Backend**: Node.js, Express, Socket.IO
- **Frontend**: React, Vite, Socket.IO Client, Canvas API
- **Features**: WebSocket-based real-time sync, HTML5 Canvas

## How It Works

1. Users connect to the WebSocket server
2. Drawing actions are broadcast to all connected users
3. Canvas state is synchronized in real-time
4. User cursors are tracked and displayed for collaboration awareness
