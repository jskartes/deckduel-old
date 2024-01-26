const UserPage = ({ user }) => {
  return (
    <div className='UserPage'>
      <h1>Hello, {user.username}!</h1>
    </div>
  );
}

export default UserPage;
