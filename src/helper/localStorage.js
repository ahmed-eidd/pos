export const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  return JSON.parse(token);
};

export const setToken = token => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const setPointOfSale = pos => {
  localStorage.setItem('pos', pos);
};

export const getPointOfSale = () => {
  const pos = localStorage.getItem('pos');
  if (!pos) return null;
  return JSON.parse(pos);
};

export const removePointOfSale = () => {
  localStorage.removeItem('pos');
};

export const setShiftId = id => {
  localStorage.setItem('shifId', id);
};

export const getShiftId = () => {
  const shifId = localStorage.getItem('shifId');
  if (!shifId) return null;
  return JSON.parse(shifId);
};

export const removeShifId = () => {
  return localStorage.removeItem('shifId');
};
export const clearDataStorage = () => {
  removeToken();
  removePointOfSale();
  removeShifId();
};
