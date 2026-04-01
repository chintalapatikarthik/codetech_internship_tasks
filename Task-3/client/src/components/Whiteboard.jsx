import { useRef, useEffect, useState, useCallback } from 'react';
import { socket } from '../socket';
import './Whiteboard.css';

function Whiteboard({ username, onLeave }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState('pen');
  const [users, setUsers] = useState([]);
  const [cursors, setCursors] = useState({});
  const lastPos = useRef({ x: 0, y: 0 });

  const colors = ['#000000', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#f39c12', '#1abc9c', '#e91e63'];

  const getCanvasCoords = useCallback((e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }, []);

  const drawLine = useCallback((x1, y1, x2, y2, strokeColor, strokeWidth, isEraser = false) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = isEraser ? '#ffffff' : strokeColor;
    ctx.lineWidth = isEraser ? strokeWidth * 3 : strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  }, []);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDrawing(true);
    const coords = getCanvasCoords(e);
    lastPos.current = coords;
  }, [getCanvasCoords]);

  const handleMouseMove = useCallback((e) => {
    e.preventDefault();
    const coords = getCanvasCoords(e);
    
    // Send cursor position
    socket.emit('cursorMove', { x: coords.x, y: coords.y });
    
    if (!isDrawing) return;
    
    const isEraser = tool === 'eraser';
    drawLine(lastPos.current.x, lastPos.current.y, coords.x, coords.y, color, brushSize, isEraser);
    
    // Send drawing data
    socket.emit('draw', {
      x1: lastPos.current.x,
      y1: lastPos.current.y,
      x2: coords.x,
      y2: coords.y,
      color,
      brushSize,
      isEraser
    });
    
    lastPos.current = coords;
  }, [isDrawing, color, brushSize, tool, getCanvasCoords, drawLine]);

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    socket.emit('clearCanvas');
  }, []);

  const handleUndo = useCallback(() => {
    socket.emit('undo');
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 1200;
    canvas.height = 800;
    
    // Fill with white
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Socket event listeners
    socket.on('draw', (data) => {
      drawLine(data.x1, data.y1, data.x2, data.y2, data.color, data.brushSize, data.isEraser);
    });

    socket.on('loadHistory', (history) => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      history.forEach((data) => {
        drawLine(data.x1, data.y1, data.x2, data.y2, data.color, data.brushSize, data.isEraser);
      });
    });

    socket.on('clearCanvas', () => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    socket.on('userJoined', ({ users }) => {
      setUsers(users);
    });

    socket.on('userLeft', ({ odId, users }) => {
      setUsers(users);
      setCursors(prev => {
        const newCursors = { ...prev };
        delete newCursors[odId];
        return newCursors;
      });
    });

    socket.on('cursorMove', ({ odId, username, color, x, y }) => {
      setCursors(prev => ({
        ...prev,
        [odId]: { username, color, x, y }
      }));
    });

    return () => {
      socket.off('draw');
      socket.off('loadHistory');
      socket.off('clearCanvas');
      socket.off('userJoined');
      socket.off('userLeft');
      socket.off('cursorMove');
    };
  }, [drawLine]);

  const handleLeave = () => {
    socket.disconnect();
    onLeave();
  };

  return (
    <div className="whiteboard-container">
      <header className="whiteboard-header">
        <div className="header-left">
          <h2>🎨 Collaborative Whiteboard</h2>
          <span className="user-badge">{username}</span>
        </div>
        <div className="header-right">
          <div className="users-online">
            {users.map((user, i) => (
              <span key={i} className="user-dot" style={{ backgroundColor: user.color }} title={user.username}>
                {user.username[0].toUpperCase()}
              </span>
            ))}
          </div>
          <button onClick={handleLeave} className="leave-btn">Leave</button>
        </div>
      </header>

      <div className="toolbar">
        <div className="tool-group">
          <label>Tool:</label>
          <button 
            className={`tool-btn ${tool === 'pen' ? 'active' : ''}`}
            onClick={() => setTool('pen')}
          >
            ✏️ Pen
          </button>
          <button 
            className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`}
            onClick={() => setTool('eraser')}
          >
            🧹 Eraser
          </button>
        </div>

        <div className="tool-group">
          <label>Color:</label>
          <div className="color-picker">
            {colors.map((c) => (
              <button
                key={c}
                className={`color-btn ${color === c ? 'active' : ''}`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </div>

        <div className="tool-group">
          <label>Size: {brushSize}px</label>
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
          />
        </div>

        <div className="tool-group actions">
          <button onClick={handleUndo} className="action-btn">↩️ Undo</button>
          <button onClick={clearCanvas} className="action-btn danger">🗑️ Clear All</button>
        </div>
      </div>

      <div className="canvas-wrapper">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        />
        
        {/* Render other users' cursors */}
        {Object.entries(cursors).map(([odId, cursor]) => (
          <div
            key={odId}
            className="cursor"
            style={{
              left: `${(cursor.x / 1200) * 100}%`,
              top: `${(cursor.y / 800) * 100}%`,
              borderColor: cursor.color
            }}
          >
            <span className="cursor-label" style={{ backgroundColor: cursor.color }}>
              {cursor.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Whiteboard;
