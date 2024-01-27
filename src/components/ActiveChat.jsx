import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const ActiveChat = ({ activeChat }) => {
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.on('connect', () => console.log(socket.id));
    return () => socket.disconnect();
  }, []);

  const handleChange = event => {
    setNewMessage(event.target.value);
  }

  const sendMessage = event => {
    event.preventDefault();
  }

  return (
    <div className='ActiveChat'>
      <p>Chat with {activeChat.players[0].username}</p>
      <ul>
        {activeChat.messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage} autoComplete='off'>
        <input
          required
          type='text'
          value={newMessage}
          onChange={handleChange}
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
}

export default ActiveChat;
