import axios from 'axios';

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

  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${JSON.parse(token)}`,
      withCredentials: true,
    },
    ...config,
  });

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
