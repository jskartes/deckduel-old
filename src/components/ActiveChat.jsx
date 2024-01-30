import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import * as chatsAPI from '../utilities/chats-api';

const ActiveChat = ({ user, activeChat, addFriend, endChat }) => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const socket = useRef(null);

  useEffect(() => {
    setMessageHistory([...activeChat.messages]);
    
    socket.current = io('http://localhost:3000');
    socket.current.on('connect', () => {
      socket.current.emit('join', activeChat._id)
    });

    return () => {
      if (socket.current) socket.current.disconnect();
    }
  }, []);

  useEffect(() => {
    socket.current.on('message', message => {
      setMessageHistory([...messageHistory, message]);
    })
  }, [socket.current, messageHistory]);

  const handleChange = event => {
    setNewMessage(event.target.value);
  }

  const sendMessage = async event => {
    event.preventDefault();
    const message = await chatsAPI.saveMessageToChat(activeChat, newMessage);
    socket.current.emit('message', message);
    setNewMessage('');
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
        {messageHistory.map((message, index) => (
          <li
            key={index}
            className={user._id === message.author ?
                      'user-author' :
                      'user-not-author'}
          >{message.content}</li>
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
