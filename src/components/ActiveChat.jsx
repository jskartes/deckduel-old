import { useState } from 'react';

const ActiveChat = ({ user, activeChat, addFriend, endChat }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleChange = event => {
    setNewMessage(event.target.value);
  }

  const sendMessage = event => {
    event.preventDefault();
  }

  const chatWith = activeChat.players.find(player => {
    return player.username !== user.username
  });

  return (
    <div className='ActiveChat'>
      <span className='chat-title'>
        Chat with <span>{chatWith.username}</span>
      </span>
      <div className='chat-actions'>
        <div className='nav-button' onClick={() => addFriend(chatWith)}>
          Add as Friend
        </div>
        <div className='nav-button' onClick={endChat}>
          End Chat
        </div>
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
