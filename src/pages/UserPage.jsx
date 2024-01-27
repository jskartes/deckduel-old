import { useState } from 'react';
import { createPortal } from 'react-dom';
import * as usersService from '../utilities/users-service';
import Chat from '../components/Chat';
import UserPageNav from '../components/UserPageNav';
import UserSearch from '../components/UserSearch';

const UserPage = ({ user, setUser }) => {
  const [showUserSearch, setShowUserSearch] = useState(false);

  const handleLogout = () => {
    usersService.logoutUser();
    setUser(null);
  }

  const blur = showUserSearch ? 'blur' : '';

  return (
    <div className={`UserPage ${blur}`}>
      <Chat setShowUserSearch={setShowUserSearch} />
      <div className='main-content'>
        <UserPageNav user={user} handleLogout={handleLogout} />
      </div>
      {showUserSearch && createPortal(
        <UserSearch handleCancel={() => setShowUserSearch(false)} />,
        document.getElementById('App')
      )}
    </div>
  );
}

export default UserPage;
