import ActiveChat from './ActiveChat';

const Chat = ({ user,
                toggleShowUserSearch,
                initiateChat,
                endChat,
                activeChat }) => {
  console.log(activeChat);

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
          {user.friends &&
          user.friends.map(friend => (
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
