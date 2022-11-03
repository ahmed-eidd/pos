import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 'all',
};

const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState,
  reducers: {
    setActiveCategory: (state, { payload }) => {
      state.activeCategory = payload;
    },
  },
});


export const {setActiveCategory} = categoriesSlice.actions;
export default categoriesSlice.reducer;
