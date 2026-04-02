import { io } from 'socket.io-client';

const getSocketUrl = () => {
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:3002';
  }
  // For Codespaces: hostname is like "xxx-5175.app.github.dev"
  // Need to change to "xxx-3002.app.github.dev"
  const hostname = window.location.hostname;
  // Replace the port number before .app.github.dev
  const newHostname = hostname.replace(/(-\d+)(\.app\.github\.dev)$/, '-3002$2');
  const url = `https://${newHostname}`;
  console.log('Original hostname:', hostname);
  console.log('Socket URL:', url);
  return url;
};

export const socket = io(getSocketUrl(), {
  autoConnect: false,
  transports: ['polling', 'websocket'],
  withCredentials: false
});
