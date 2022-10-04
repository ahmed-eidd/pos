export const categoriesSlice = (set) => ({
  activeCategory: 'all',
  setActiveCategory: (payload) => {
    set((state) => ({
      ...state,
      categories: {
        ...state.categories,
        activeCategory: payload,
      },
    }));
  },
});
