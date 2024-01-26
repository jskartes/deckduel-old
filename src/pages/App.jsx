import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginUser from './LoginUser';
import RegisterUser from './RegisterUser';
import Splash from './Splash';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={<Splash />}
        />
        <Route
          path='/register'
          element={<RegisterUser />}
        />
        <Route
          path='/login'
          element={<LoginUser />}
        />
      </Routes>
    </div>
  );
}

export default App;
