import { combineReducers } from '@reduxjs/toolkit';
import profileModalReducer from './profileModalSlice';
import categoriesReducer from './categoriesSlice';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';

export default combineReducers({
  profileModal: profileModalReducer,
  categories: categoriesReducer,
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
});
