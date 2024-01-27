import { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const socket = socketIOClient('http://localhost:3000');
    socket.on('chat message', message => {
      setMessages(prev => [...prev, message])
    });
    return () => socket.disconnect();
  }, []);

  const handleChange = event => {
    setNewMessage(event.target.value);
  }

  const sendMessage = event => {
    event.preventDefault();
    const socket = socketIOClient('http://localhost:3000');
    socket.emit('chat message', newMessage);
    setNewMessage('');
  }

  return (
    <div className='Chat'>
      <ul>
        {messages.map((message, index) => (
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

export default Chat;
