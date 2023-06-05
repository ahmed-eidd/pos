import { configureStore } from '@reduxjs/toolkit';
// import profileModalReducer from '../store/profileModalSlice';
// import categoriesReducer from '../store/categoriesSlice';
// import authReducer from '../store/authSlice';
// import cartReducer from '../store/cartSlice';
// import orderReducer from '../store/orderSlice';

import reducer from '../store/rootReducer';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: [carts, user],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
