export const getToken = () => {
  const token = localStorage.getItem('token');
  return JSON.parse(token);
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const setPointOfSale = (pos) => {
  localStorage.setItem('pos', pos);
};

export const getPointOfSale = () => {
  const pos = localStorage.getItem('pos');
  return JSON.parse(pos);
};

export const removePointOfSale = () => {
  localStorage.removeItem('pos');
};

export const setShiftId = (id) => {
  localStorage.setItem('shifId', id);
};

export const getShiftId = () => {
  return localStorage.getItem('shifId');
};

export const removeShifId = () => {
  return localStorage.removeItem('shifId');
};
