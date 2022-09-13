import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { productSlice } from './productsSlice';
import { profileModaSlice } from './profileModalSlice';

export const useZusStore = create(
  devtools((...a) => ({
    products: productSlice(...a),
    profileModal: profileModaSlice(...a),
  }))
);
