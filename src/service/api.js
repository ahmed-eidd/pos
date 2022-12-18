import axios from 'axios';

export const axiosInstance = (config = {}) => {
  // const { user } = useUser()

  // const token = user?.token
  const token = localStorage.getItem('token');

  return axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${JSON.parse(token)}`,
      // Authorization: `Bearer ${token}`,
    },
    ...config,
  });
};
