import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as usersService from '../utilities/users-service';

const LoginUser = ({ setUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    errorMessage: ''
  });

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      errorMessage: ''
    });
  }

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const user = await usersService.loginUser(formData);
      setUser(user);
    } catch {
      setFormData({
        ...formData,
        errorMessage: 'Login failed; try again'
      });
    }
  }

  return (
    <div className='LoginUser'>
      <span className='form-title'>Player Login</span>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <label>Username</label>
        <input
          required
          type='text'
          name='username'
          value={formData.username}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          required
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
        <button className='nav-button' type='submit'>Log In</button>
      </form>

      <p className='error-message'>{formData.errorMessage}</p>

      <Link className='nav-button' to='/register'>New Player Registration</Link>
    </div>
  );
}

export default LoginUser;
