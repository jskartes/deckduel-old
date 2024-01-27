import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../utilities/users-service';
import LoginUser from './LoginUser';
import RegisterUser from './RegisterUser';
import Splash from './Splash';
import UserPage from './UserPage';

const App = () => {
  const [user, setUser] = useState(getUser());

  return (
    <div id='App' className='App'>
      <Routes>
        {user ?
        <>
          <Route
            path={`/${user.username}`}
            element={<UserPage user={user} setUser={setUser} />}
          />
          <Route
            path='/*'
            element={<Navigate to={`/${user.username}`} />}
          />
        </> :
        <>
          <Route
            path='/'
            element={<Splash />}
          />
          <Route
            path='/register'
            element={<RegisterUser setUser={setUser} />}
          />
          <Route
            path='/login'
            element={<LoginUser setUser={setUser} />}
          />
          <Route
            path='/*'
            element={<Navigate to='/login' />}
          />
        </>}
      </Routes>
    </div>
  );
}

export default App;
