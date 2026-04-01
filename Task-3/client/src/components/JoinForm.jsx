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
        <h1>🎨 Collaborative Whiteboard</h1>
        <p>Draw together in real-time with others</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <button type="submit" disabled={!username.trim()}>
            Join Whiteboard
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinForm;
