import { configureStore } from '@reduxjs/toolkit';
import profileModalReducer from '../store/profileModalSlice';
import categoriesReducer from '../store/categoriesSlice';
import authReducer from '../store/authSlice';
import cartReducer from '../store/cartSlice';
import orderReducer from '../store/orderSlice';

const store = configureStore({
  reducer: {
    profileModal: profileModalReducer,
    categories: categoriesReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export default store;
