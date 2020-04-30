import axios from 'axios';

export const authenticateUser = (credentials: { email: string, password: string }) => {
   return axios.post('/api/users/login', credentials);
};
export const registerUser = (credentials: { email: string, password: string, role: string }) => {
  return axios.post('/api/users/register', credentials);
};

