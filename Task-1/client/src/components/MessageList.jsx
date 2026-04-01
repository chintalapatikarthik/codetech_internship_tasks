import { useEffect, useRef } from 'react';
import './MessageList.css';

function MessageList({ messages, currentUser }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <div 
          key={index} 
          className={`message ${msg.type} ${msg.username === currentUser ? 'own' : ''}`}
        >
          {msg.type === 'system' ? (
            <span className="system-text">{msg.text}</span>
          ) : (
            <>
              <div className="message-header">
                <span className="username">{msg.username}</span>
                <span className="time">{formatTime(msg.timestamp)}</span>
              </div>
              <div className="message-text">{msg.text}</div>
            </>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;
