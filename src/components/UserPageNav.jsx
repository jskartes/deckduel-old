const UserPageNav = ({ user, handleLogout }) => {
  return (
    <div className='UserPageNav'>
      <span>Well, hello there,&nbsp;
        <span className='username'>{user.username}</span>!
      </span>
      <div className='nav-links'>
        <span>Link</span>
        <span>Link</span>
        <span>Account Settings</span>
        <span onClick={handleLogout}>Log Out</span>
      </div>
    </div>
  );
}

export default UserPageNav;
