import { useState } from 'react';
import { createPortal } from 'react-dom';
import * as usersService from '../utilities/users-service';
import * as chatsAPI from '../utilities/chats-api';
import Chat from '../components/Chat';
import UserPageNav from '../components/UserPageNav';
import UserSearch from '../components/UserSearch';

const UserPage = ({ user, setUser }) => {
  const [pageStatus, setPageStatus] = useState({
    showUserSearch: false,
    activeChat: null,
    error: ''
  });

  const initiateChat = async withUser => {
    try {
      const chat = await chatsAPI.initiateChat(withUser);
      setPageStatus({
        ...pageStatus,
        showUserSearch: false,
        activeChat: chat
      });
    } catch {
      setPageStatus({
        ...pageStatus,
        error: 'Chat initiation failed'
      });
    }
  }

  const toggleShowUserSearch = () => {
    const currentShowUserSearch = pageStatus.showUserSearch;
    setPageStatus({
      ...pageStatus,
      showUserSearch: !currentShowUserSearch
    });
  }

  const handleLogout = () => {
    usersService.logoutUser();
    setUser(null);
  }

  const blur = pageStatus.showUserSearch ? 'blur' : '';

  return (
    <div className={`UserPage ${blur}`}>
      <Chat
        user={user}
        toggleShowUserSearch={toggleShowUserSearch}
        initiateChat={initiateChat}
        activeChat={pageStatus.activeChat}
      />
      <div className='main-content'>
        <UserPageNav user={user} handleLogout={handleLogout} />
      </div>
      {pageStatus.showUserSearch && createPortal(
        <UserSearch
          handleCancel={toggleShowUserSearch}
          initiateChat={initiateChat}
        />,
        document.getElementById('App')
      )}
    </div>
  );
}

export default UserPage;
