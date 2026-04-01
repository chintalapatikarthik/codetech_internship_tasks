# CodeTech Internship Tasks

## Task 1: Real-Time Chat Application

A real-time chat application built with **Socket.IO** for the backend and **React** for the frontend.

### Features

- 💬 Real-time messaging with WebSockets
- 👥 Online users list
- ✍️ Typing indicators
- 🔔 Join/leave notifications
- 📱 Responsive design

### Project Structure

```
├── server/          # Backend (Node.js + Express + Socket.IO)
│   ├── index.js     # Server entry point
│   └── package.json
│
└── client/          # Frontend (React + Vite)
    └── src/
        ├── components/
        │   ├── JoinForm.jsx     # Username entry screen
        │   ├── ChatRoom.jsx     # Main chat interface
        │   ├── MessageList.jsx  # Message display
        │   ├── MessageInput.jsx # Message input field
        │   └── UserList.jsx     # Online users sidebar
        ├── socket.js            # Socket.IO client config
        └── App.jsx              # Main app component
```

### Getting Started

#### 1. Start the Server

```bash
cd server
npm install
npm start
```

Server runs on `http://localhost:3001`

#### 2. Start the Client

```bash
cd client
npm install
npm run dev
```

Client runs on `http://localhost:5173`

#### 3. Use the App

1. Open `http://localhost:5173` in your browser
2. Enter a username to join the chat
3. Open another browser tab/window and join with a different username
4. Start chatting in real-time!

### Technologies Used

- **Backend**: Node.js, Express, Socket.IO
- **Frontend**: React, Vite, Socket.IO Client
- **Styling**: CSS3 with modern features (flexbox, gradients, animations)