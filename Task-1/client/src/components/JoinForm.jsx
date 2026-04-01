import { useState } from 'react';
import './JoinForm.css';

function JoinForm({ onJoin }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onJoin(username.trim());
    }
  };

  return (
    <div className="join-container">
      <div className="join-card">
        <h1>💬 Real-Time Chat</h1>
        <p>Enter your username to join the chat</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <button type="submit" disabled={!username.trim()}>
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinForm;
