import API from 'API';
import { updateToken, removeToken } from 'services/tokenService';

export const registration = async (user) => {
  const { data } = API.post('/auth/register', user);
  return data;
};

export const login = async (user) => {
  const data = await API.post('/auth/login', user);
  updateToken(data.data.token);
  return data;
};

export const logout = async () => {
  removeToken();
};

export const requestChangePasswordService = (email) => {
  const { data } = API.post('/auth/request-reset-password', { email });
  return data;
};

export const resetPasswordService = (token, userId, password) => {
  const { data } = API.post('/auth/reset-password', { token, userId, password });
  return data;
};
