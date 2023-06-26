import axios from 'axios';

export const axiosInstance = (config = {}) => {
  // const { user } = useUser()

  // const token = user?.token
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  // console.log('axiosInstance  user', user);
  const organizationId = user
    ? JSON.parse(user)?.organization_admin?.organization_id
    : '';
  // console.log('axiosInstance  organization_id', organizationId);
  return axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
      // 'content-type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${JSON.parse(token)}`,
      organizationId,
    },
    ...config,
  });
};
