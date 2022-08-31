import create from 'zustand';
import pizza1 from '../assets/products/pizza-1.png';
import pizza2 from '../assets/products/pizza-2.png';
import pizza3 from '../assets/products/pizza-3.png';
import pizza4 from '../assets/products/pizza-4.png';

const products = (idStarts = 1, reverse) => {
  const items = [
    {
      name: 'بيتزا بروسيوتو فونغي',
      id: idStarts + 1,
      img: pizza1,
      price: 150,
    },
    {
      name: 'بيتزا كواترو ستاجيوني',
      id: idStarts + 2,
      img: pizza2,
      price: 140,
    },
    {
      name: 'صيد بيتزا فيشرمان',
      id: idStarts + 3,
      img: pizza3,
      price: 145,
    },
    {
      name: 'بيتزا دجاج رانش',
      id: idStarts + 4,
      img: pizza4,
      price: 200,
    },
  ];
  return reverse ? items.reverse() : items;
};
export const useProductsStore = create((set) => ({
  products: [
    ...products(1),
    ...products(5, true),
    ...products(10),
    ...products(50, true),
  ],
  cart: [],
  addToCart: (id) =>
    set((state) => ({
      cart: [
        ...state.cart,
        { ...state.products.find((prd) => prd.id === id), quantity: 1 },
      ],
    })),
  deleteFromCart: (id) =>
    set((state) => state.cart.filter((prd) => prd.id !== id)),
  increaseQuantity: (id) =>
    set((state) => {
      const foundProductIdx = state.cart.findIndex((el) => el.id === id);
      state.cart[foundProductIdx] = state.cart[foundProductIdx].quantity + 1;
    }),
  decreaseQuantity: (id) =>
    set((state) => {
      const foundProductIdx = state.cart.findIndex((el) => el.id === id);
      state.cart[foundProductIdx] = state.cart[foundProductIdx].quantity - 1;
    }),
}));
