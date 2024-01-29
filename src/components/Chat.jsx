import { useState, useEffect } from 'react';
import * as usersAPI from '../utilities/users-api';
import ActiveChat from './ActiveChat';

const Chat = ({ user,
                toggleShowUserSearch,
                initiateChat,
                endChat,
                activeChat }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const friends = await usersAPI.getFriends();
      setFriends(friends);
    }
    getFriends();
  }, []);

  const addFriend = newFriend => {
    try {
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='Chat'>
      <div>
        <button
          className='nav-button'
          onClick={toggleShowUserSearch}
        >Search Users</button>
      </div>
      <div className='friends'>
        <span>Friends</span>
        <div className='friends-list'>
          {friends &&
          friends.map(friend => (
            <span onClick={() => initiateChat(friend)}>
              {friend.username}
            </span>
          ))}
        </div>
      </div>
      {activeChat
      ?
      <ActiveChat
        user={user}
        activeChat={activeChat}
        addFriend={addFriend}
        endChat={endChat}
      />
      :
      <div className='inactive'>
        <span>No</span>
        <span>Active</span>
        <span>Chat</span>
      </div>}
    </div>
  );
}

export default Chat;
