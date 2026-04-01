import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 
  (window.location.hostname === 'localhost' 
    ? 'http://localhost:3002' 
    : `https://${window.location.hostname.replace('-5174', '-3002')}`);

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ['websocket', 'polling']
});
