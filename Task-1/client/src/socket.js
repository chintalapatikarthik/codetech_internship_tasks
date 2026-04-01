import { io } from 'socket.io-client';

// In development/Codespaces, use relative URL or environment variable
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 
  (window.location.hostname === 'localhost' 
    ? 'http://localhost:3001' 
    : `https://${window.location.hostname.replace('-5173', '-3001')}`);

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ['websocket', 'polling']
});
