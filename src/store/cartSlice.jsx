import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showSavedOrder: false,
  currentSavedOrderId: null,
  cart: null,
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    setCurrentSavedOrderIdAction: (state, { payload }) => {
      state.currentSavedOrderId = payload;
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
  setCart,
} = cartSlice.actions;
export default cartSlice.reducer;
