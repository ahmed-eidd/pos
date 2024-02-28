import { createSlice } from '@reduxjs/toolkit';

export const ProfileModalStates = {
  PROFILE: 'PROFILE',
  BEFORE_OPENING_BALANCE_STEP: 'BEFORE_OPENING_BALANCE',
  OPENING_BALANCE_STEP: 'OPENING_BALANCE_STEP',
  LOGOUT: 'LOGOUT',
  SHOW_SHEET_REPORT: 'SHOW_SHEET_REPORT',
};

const initialState = {
  open: false,
  openingBalance: null,
  step: ProfileModalStates.PROFILE,
};

const profileModalSlice = createSlice({
  name: 'profileModalSlice',
  initialState,
  reducers: {
    setStep: (state, { payload }) => {
      state.step = payload;
    },
    setProfileModalOpen: (state) => {
      state.open = true;
    },

    setProfileModalClose: (state) => {
      state.step = ProfileModalStates.PROFILE;
      state.open = false;
    },
    setOpeningBalance: (state, { payload }) => {
      state.openingBalance = payload;
    },
  },
});

export const {
  setOpeningBalance,
  setProfileModalClose,
  setProfileModalOpen,
  setStep,
} = profileModalSlice.actions;
export default profileModalSlice.reducer;
