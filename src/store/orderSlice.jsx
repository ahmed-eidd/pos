import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  printedOrder: null,
};


const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
  setPrintedOrder: (state,{ payload }) => {
      state.printedOrder = payload;
  },
  }
})

export const {setPrintedOrder} = orderSlice.actions;
export default orderSlice.reducer;
