import * as usersService from '../utilities/users-service';

const UserPage = ({ user, setUser }) => {
  const handleLogout = event => {
    usersService.logoutUser();
    setUser(null);
  }

  return (
    <div className='UserPage'>
      <h1>Hello, {user.username}!</h1>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default UserPage;
