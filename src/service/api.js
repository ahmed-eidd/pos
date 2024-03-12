import { message } from 'antd';
import axios from 'axios';

export const axiosInstance = (config = {}) => {
  // const { user } = useUser()

  // const token = user?.token
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const mode = localStorage.getItem('mode');
  // console.log('axiosInstance  user', user);
  const organizationId = user
    ? JSON.parse(user)?.organization_admin?.organization_id
    : '';
  const adminId = user
    ? JSON.parse(user)?.organization_admin?.id
    : '';
  // console.log('axiosInstance  organization_id', organizationId);
  return axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    // baseURL: 'http://134.209.38.16/elwezara/public/api',
    headers: {
      'Content-Type': 'multipart/form-data',
      // 'content-type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${JSON.parse(token)}`,
      admin: adminId,
      organizationId,
      ...(mode ? { mode: mode } : {})
    },
    ...config,
  });
};

axiosInstance().interceptors.response.use(
  (res) => {
    if (res?.data?.code === 101) {
      if (typeof res?.data?.validation === 'string')
        message.error(res?.data?.validation);
      else res?.data?.validation?.forEach((err) => message.error(err));
    }
    return res;
  },
  (err) => {
    console.log('interceptors err:', err);
    const statusCode = err.response.status;
    return err;
  }
);
