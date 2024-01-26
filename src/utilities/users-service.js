import * as usersAPI from './users-api';

export const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  if (payload.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export const getUser = () => {
  const token = getToken();
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export const registerUser = async submitData => {
  const user = await usersAPI.registerUser(submitData);
  return user;
}

export const loginUser = async credentials => {
  const token = await usersAPI.loginUser(credentials);
  localStorage.setItem('token', token);
  return getUser();
}

export const logoutUser = () => {
  usersAPI.logoutUser();
  localStorage.removeItem('token');
}
