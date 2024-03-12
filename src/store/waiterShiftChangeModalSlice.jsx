import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

const waiterShiftChangeSlice = createSlice({
  name: 'waiterShiftChangeSlice',
  initialState,
  reducers: {
    setWaiterShiftChangeModalOpen: (state) => {
      state.open = true;

      console.log('test')
    },

    setWaiterShiftChangeModaClose: (state) => {
      state.open = false;
      console.log('test close')
    },
  },
});

export const {
  setWaiterShiftChangeModalOpen,
  setWaiterShiftChangeModaClose,
} = waiterShiftChangeSlice.actions;
export default waiterShiftChangeSlice.reducer;
