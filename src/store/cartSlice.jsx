import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showSavedOrder: false,
  currentSavedOrderId: null,
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    setCurrentSavedOrderId: (state, { payload }) => {
      state.currentSavedOrderId = payload;
    },
    setCartToShowSavedOrder: (state, { payload }) => {
      state.showSavedOrder = payload;
    },
  },
});

export const { setCartToShowSavedOrder, setCurrentSavedOrderId } =
  cartSlice.actions;
export default cartSlice.reducer;
