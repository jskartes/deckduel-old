import sendRequest from './send-request';

export const getAllUsers = async () => {
  return sendRequest('/api/users');
}

export const registerUser = async submitData => {
  const res = await fetch('/api/users/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(submitData)
  });
  if (res.ok) return res.json();
  throw new Error();
}

export const loginUser = async credentials => {
  const res = await fetch('/api/users/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(credentials)
  });
  if (res.ok) return res.json();
  throw new Error();
}

export const logoutUser = () => {
  sendRequest('/api/users/logout');
}
