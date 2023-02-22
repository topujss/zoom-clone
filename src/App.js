import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('message', (data) => {
      setMessage(data);
    });
  }, []);

  const handleClick = () => {
    socket.emit('message', 'Hello, server!');
  };

  return (
    <div className="App">
      <h1>{message}</h1>
      <button onClick={handleClick}>Send Message</button>
    </div>
  );
}

export default App;
