import { createSlice } from '@reduxjs/toolkit';
import { getPointOfSale, getShiftId, getToken } from '../helper/localStorage';

const initialState = {
  currentUser: null,
  token: getToken(),
  sheet: getShiftId(),
  posId: getPointOfSale(),
  organizationId: null,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
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
  },
});

export const {
  setCurrentUser,
  setPosId,
  setSheet,
  setToken,
  setOrganizationId,
} = authSlice.actions;

export default authSlice.reducer;
