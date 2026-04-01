import { useState } from 'react';
import { socket } from './socket';
import JoinForm from './components/JoinForm';
import ChatRoom from './components/ChatRoom';

function App() {
  const [username, setUsername] = useState(null);

  const handleJoin = (name) => {
    setUsername(name);
    socket.connect();
    socket.emit('join', name);
  };

  const handleLeave = () => {
    setUsername(null);
  };

  return username ? (
    <ChatRoom username={username} onLeave={handleLeave} />
  ) : (
    <JoinForm onJoin={handleJoin} />
  );
}

export default App;
