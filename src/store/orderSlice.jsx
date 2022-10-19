export const orderSlice = (set) => ({
  printedOrder: null,
  setPrintedOrder: (payload) => {
    set((state) => ({
      ...state,
      order: {
        ...state.order,
        printedOrder: payload,
      },
    }));
  },
});
