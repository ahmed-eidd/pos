import { createSlice } from '@reduxjs/toolkit';
import { getPointOfSale, getShiftId, getToken } from '../helper/localStorage';

export const loginTypeEnum = {
  cashier: 1,
  waiter: 2,
  cashierType: 'cashier',
  waiterType: 'waiter',
};
const initialState = {
  currentUser: null,
  loginType: loginTypeEnum.cashier, // 1 for cashier
  isLoginIn: false, // this to check wether the user is login end or not, it set in the final login step to ensure that the user is succefully logged in
  token: getToken(),
  sheet: getShiftId(),
  posId: getPointOfSale(),
  organizationId: null,
  data: null,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
    setIsLogin: (state, { payload }) => {
      state.isLoginIn = payload;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setSheet: (state, { payload }) => {
      state.sheet = payload;
    },
    setPosId: (state, { payload }) => {
      state.posId = payload;
    },
    setOrganizationId: (state, { payload }) => {
      state.organizationId = payload;
    },
    setAuthData: (state, { payload }) => {
      state.data = payload;
    },
    setLoginType: (state, { payload }) => {
      state.loginType = payload;
    },
  },
});

export const {
  setCurrentUser,
  setPosId,
  setSheet,
  setToken,
  setOrganizationId,
  setAuthData,
  setLoginType,
  setIsLogin,
} = authSlice.actions;

export default authSlice.reducer;
