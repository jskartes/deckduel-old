import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = event => {
    event.preventDefault();
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

      <Link className='nav-button' to='/register'>New Player Registration</Link>
    </div>
  );
}

export default LoginUser;
