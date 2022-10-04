import create from 'zustand';
// TODO: import Presist from zustand/middleware Add it to zustand store
import { devtools } from 'zustand/middleware';
import { authSlice } from './authSlice';
import { categoriesSlice } from './categoriesSlice';
import { productSlice } from './productsSlice';
import { profileModaSlice } from './profileModalSlice';

export const useZusStore = create(
  devtools((...a) => ({
    products: productSlice(...a),
    profileModal: profileModaSlice(...a),
    categories: categoriesSlice(...a),
    auth: authSlice(...a),
  }))
);
