import { message } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';

//  ENDPOINT
const baseURL = process.env.REACT_APP_BASE_URL;

// function getCookie(name) {
//   let cookie = {};
//   document.cookie.split(';').forEach(function (el) {
//     let [k, v] = el.split('=');
//     cookie[k.trim()] = v;
//   });
//   return cookie[name];
// }

//  START FUNCTION
function useApi(config = {}) {
  const token = localStorage.getItem('token');
  const { organizationId } = useSelector((state) => state.auth);

  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${JSON.parse(token)}`,
      organizationId,
      withCredentials: true,
    },
    ...config,
  });

  axiosInstance.interceptors.request.use((req) => {
    console.log('interceptors req:', req);
    return req;
  });

  axiosInstance.interceptors.response.use(
    (res) => {
      console.log('axiosInstance.interceptors.response.use  res:', res);
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
  // ############################
  async function get(route) {
    const { data } = await axiosInstance.get(route);
    return data;
  }

  async function post(route, body) {
    const { data } = await axiosInstance.post(route, body);
    return data;
  }

  async function put(route, body) {
    const { data } = await axiosInstance.put(route, body);
    return data;
  }

  async function patch(route, body) {
    const { data } = await axiosInstance.patch(route, body);
    return data;
  }

  async function del(route) {
    const { data } = await axiosInstance.delete(route);
    return data;
  }

  // ############################
  return { get, post, put, patch, delete: del };
}

export default useApi;
