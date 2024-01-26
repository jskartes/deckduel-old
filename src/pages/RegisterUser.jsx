import { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    <div className='RegisterUser'>
      <span className='form-title'>New Player Registration</span>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <label>Username</label>
        <input
          required
          type='text'
          name='username'
          value={formData.username}
          onChange={handleChange}
        />
        <label>E-mail Address</label>
        <input
          required
          type='email'
          name='email'
          value={formData.email}
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
        <label>Confirm Password</label>
        <input
          required
          type='password'
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button className='nav-button' type='submit'>Register</button>
      </form>

      <Link className='nav-button' to='/login'>Player Login</Link>
    </div>
  );
}

export default RegisterUser;
