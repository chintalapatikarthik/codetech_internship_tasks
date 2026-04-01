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

// Store drawing history and connected users
const drawingHistory = [];
const users = new Map();
const userColors = ['#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#f39c12', '#1abc9c', '#e91e63', '#00bcd4'];
let colorIndex = 0;

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Assign a color to new user
  const userColor = userColors[colorIndex % userColors.length];
  colorIndex++;

  // Handle user joining
  socket.on('join', (username) => {
    users.set(socket.id, { username, color: userColor });
    
    // Send current drawing history to new user
    socket.emit('loadHistory', drawingHistory);
    
    // Notify all users
    io.emit('userJoined', {
      userId: socket.id,
      username,
      color: userColor,
      users: Array.from(users.values())
    });
  });

  // Handle drawing events
  socket.on('draw', (data) => {
    const user = users.get(socket.id);
    const drawData = {
      ...data,
      odId: socket.id,
      username: user?.username,
      timestamp: Date.now()
    };
    
    drawingHistory.push(drawData);
    
    // Limit history size
    if (drawingHistory.length > 10000) {
      drawingHistory.shift();
    }
    
    // Broadcast to all other users
    socket.broadcast.emit('draw', drawData);
  });

  // Handle cursor movement
  socket.on('cursorMove', (data) => {
    const user = users.get(socket.id);
    if (user) {
      socket.broadcast.emit('cursorMove', {
        odId: socket.id,
        username: user.username,
        color: user.color,
        x: data.x,
        y: data.y
      });
    }
  });

  // Handle clear canvas
  socket.on('clearCanvas', () => {
    drawingHistory.length = 0;
    io.emit('clearCanvas');
  });

  // Handle undo
  socket.on('undo', () => {
    const userDrawings = drawingHistory.filter(d => d.odId === socket.id);
    if (userDrawings.length > 0) {
      const lastDrawing = userDrawings[userDrawings.length - 1];
      const index = drawingHistory.indexOf(lastDrawing);
      if (index > -1) {
        drawingHistory.splice(index, 1);
        io.emit('loadHistory', drawingHistory);
      }
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      users.delete(socket.id);
      io.emit('userLeft', {
        odId: socket.id,
        username: user.username,
        users: Array.from(users.values())
      });
    }
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`Whiteboard server running on http://localhost:${PORT}`);
});
