import { getPointOfSale, getShiftId, getToken } from '../helper/localStorage';

export const authSlice = (set) => ({
  token: getToken(),
  sheet: getShiftId(),
  posId: getPointOfSale(),
  setToken: (payload) => {
    set((state) => ({
      ...state,
      auth: {
        ...state.auth,
        token: payload,
      },
    }));
  },
  setSheet: (payload) => {
    set((state) => ({
      ...state,
      auth: {
        ...state.auth,
        sheet: payload,
      },
    }));
  },
  setPosId: (payload) => {
    set((state) => ({
      ...state,
      auth: {
        ...state.auth,
        posId: payload,
      },
    }));
  },
});
