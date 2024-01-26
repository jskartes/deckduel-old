import * as usersService from '../utilities/users-service';
import Chat from '../components/Chat';
import UserPageNav from '../components/UserPageNav';

const UserPage = ({ user, setUser }) => {
  const handleLogout = event => {
    usersService.logoutUser();
    setUser(null);
  }

  return (
    <div className='UserPage'>
      <Chat />
      <div className='main-content'>
        <UserPageNav user={user} handleLogout={handleLogout} />
      </div>
    </div>
  );
}

export default UserPage;
