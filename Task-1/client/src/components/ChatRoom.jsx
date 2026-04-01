import { useState, useEffect } from 'react';
import { socket } from '../socket';
import UserList from './UserList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import './ChatRoom.css';

function ChatRoom({ username, onLeave }) {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on('userJoined', ({ users }) => {
      setUsers(users);
    });

    socket.on('userLeft', ({ users }) => {
      setUsers(users);
    });

    socket.on('userTyping', ({ username, isTyping }) => {
      setTypingUsers((prev) => {
        if (isTyping) {
          return prev.includes(username) ? prev : [...prev, username];
        } else {
          return prev.filter((u) => u !== username);
        }
      });
    });

    return () => {
      socket.off('message');
      socket.off('userJoined');
      socket.off('userLeft');
      socket.off('userTyping');
    };
  }, []);

  const handleSend = (text) => {
    socket.emit('message', text);
  };

  const handleTyping = (isTyping) => {
    socket.emit('typing', isTyping);
  };

  const handleLeave = () => {
    socket.disconnect();
    onLeave();
  };

  return (
    <div className="chat-container">
      <div className="chat-main">
        <header className="chat-header">
          <h2>💬 Chat Room</h2>
          <div className="header-right">
            <span className="username-badge">{username}</span>
            <button onClick={handleLeave} className="leave-btn">Leave</button>
          </div>
        </header>
        
        <MessageList messages={messages} currentUser={username} />
        
        {typingUsers.length > 0 && (
          <div className="typing-indicator">
            {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
          </div>
        )}
        
        <MessageInput onSend={handleSend} onTyping={handleTyping} />
      </div>
      
      <aside className="chat-sidebar">
        <UserList users={users} />
      </aside>
    </div>
  );
}

export default ChatRoom;
