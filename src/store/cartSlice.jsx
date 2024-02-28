import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showSavedOrder: false,
  currentSavedOrderId: null,
  cart: null,
  currentSavedOrderTableNumber: null,
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    setCurrentSavedOrderIdAction: (state, { payload }) => {
      state.currentSavedOrderId = payload;
    },
    setCurrentSavedOrderTableNumber: (state, { payload }) => {
      state.currentSavedOrderTableNumber = payload;
    },
    setCartToShowSavedOrder: (state, { payload }) => {
      state.showSavedOrder = payload;
    },
    setCart: (state, { payload }) => {
      state.cart = payload;
    },
  },
});

export const {
  setCartToShowSavedOrder,
  setCurrentSavedOrderIdAction,
  setCurrentSavedOrderTableNumber,
  setCart,
} = cartSlice.actions;
export default cartSlice.reducer;
