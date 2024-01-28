import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const ActiveChat = ({ user, activeChat, endChat }) => {
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.on('connect', () => console.log('chat socket', socket.id));
    return () => socket.disconnect();
  }, []);

  const handleChange = event => {
    setNewMessage(event.target.value);
  }

  const sendMessage = event => {
    event.preventDefault();
  }

  const chatWith = activeChat.players.find(player => {
    return player.username !== user.username
  }).username;

  return (
    <div className='ActiveChat'>
      <span className='chat-title'>Chat with <span>{chatWith}</span></span>
      <div className='chat-actions'>
        <div className='nav-button'>Add as Friend</div>
        <div className='nav-button' onClick={endChat}>End Chat</div>
      </div>
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
