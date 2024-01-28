import { useEffect, useState } from 'react';
import * as usersService from '../utilities/users-service';

const UserSearch = ({ handleCancel, initiateChat }) => {
  const [users, setUsers] = useState([]);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await usersService.getAllUsers();
      setUsers(allUsers);
    }
    getAllUsers();
  }, []);

  const handleChange = event => setSearchString(event.target.value);

  const filteredUsers = users.filter(user => (
    user.username.toLowerCase().includes(searchString.toLowerCase())
  ));

  return (
    <div className='UserSearch'>
      <span>User Search</span>
      <div className='user-list'>
        {filteredUsers.length
        ?
        filteredUsers.map((user, index) => (
          <span
            className='username' 
            key={index}
            onClick={() => initiateChat(user)}
          >
            {user.isOnline && <span className='online'>&#9679;</span>}
            {user.username}
          </span>
        ))
        :
        <div className='no-users'>
          <span>No</span>
          <span>Users</span>
          <span>Found</span>
        </div>}
      </div>
      <div className='user-search'>
        <input
          required
          type='text'
          name='searchString'
          placeholder='Enter username'
          value={searchString}
          onChange={handleChange}
        />
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default UserSearch;
