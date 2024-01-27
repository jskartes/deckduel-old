import { useEffect, useState } from 'react';
import * as usersService from '../utilities/users-service';

const UserSearch = ({ handleCancel }) => {
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

  const filteredUsers = users.filter(user => {
    return user.username.includes(searchString);
  });

  return (
    <div className='UserSearch'>
      <span>User Search</span>
      <div className='user-list'>
        {filteredUsers.map((user, index) => (
          <span className='username' key={index}>{user.username}</span>
        ))}
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
