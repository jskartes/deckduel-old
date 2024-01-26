import { Link } from 'react-router-dom';

const Splash = () => {
  return (
    <div className='Splash'>
      <span id='splash-title'>
        <span>D</span>
        <span>e</span>
        <span>c</span>
        <span>k</span>
        <span>D</span>
        <span>u</span>
        <span>e</span>
        <span>l</span>
      </span>
      <div id='splash-nav'>
        <Link className='nav-button' to='/register'>Register</Link>
        <Link className='nav-button' to='/login'>Log In</Link>
      </div>
    </div>
  );
}

export default Splash;
