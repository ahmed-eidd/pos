export const cartSlice = (set) => ({
  showSavedOrder: false,
  currentSavedOrderId: null,
  setCurrentSavedOrderId: (payload) => {
    set((state) => ({
      ...state,
      cart: {
        ...state.cart,
        currentSavedOrderId: payload,
      },
    }));
  },
  setCartToShowSavedOrder: (payload) => {
    set((state) => ({
      ...state,
      cart: {
        ...state.cart,
        showSavedOrder: payload,
      },
    }));
  },
});
