import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Store connected users
const users = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user joining
  socket.on('join', (username) => {
    users.set(socket.id, username);
    socket.username = username;
    
    // Notify all users about the new user
    io.emit('userJoined', {
      username,
      users: Array.from(users.values())
    });
    
    // Send system message
    io.emit('message', {
      type: 'system',
      text: `${username} joined the chat`,
      timestamp: new Date().toISOString()
    });
  });

  // Handle chat messages
  socket.on('message', (text) => {
    const message = {
      type: 'user',
      username: socket.username,
      text,
      timestamp: new Date().toISOString()
    };
    io.emit('message', message);
  });

  // Handle typing indicator
  socket.on('typing', (isTyping) => {
    socket.broadcast.emit('userTyping', {
      username: socket.username,
      isTyping
    });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    if (username) {
      users.delete(socket.id);
      
      io.emit('userLeft', {
        username,
        users: Array.from(users.values())
      });
      
      io.emit('message', {
        type: 'system',
        text: `${username} left the chat`,
        timestamp: new Date().toISOString()
      });
    }
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
