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

  const submitDisabled = (
    formData.password.length < 8 ||
    formData.password !== formData.confirmPassword
  );

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
        <div></div>
        <ul className='form-instruction'>
          <li>Maxiumum 20 characters</li>
          <li>Alphanumeric (A&ndash;Z, a&ndash;z, 0&ndash;9) and/or underscores (_) only</li>
        </ul>
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
        <div></div>
        <ul className='form-instruction'>
          <li>Minimum 8 characters</li>
        </ul>
        <label>Confirm Password</label>
        <input
          required
          type='password'
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button
          className='nav-button'
          type='submit'
          disabled={submitDisabled}
        >Register</button>
      </form>

      <Link className='nav-button' to='/login'>Player Login</Link>
    </div>
  );
}

export default RegisterUser;
