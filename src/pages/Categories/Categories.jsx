import React from 'react';
import Card from '../../components/Card/Card';
import CategoriesTab from '../../components/CategoriesTabs/CategoriesTabs';
import { useAddToCart, useIncreaseQuantity } from '../../hooks/query/useCart';
import { useGetProducts } from '../../hooks/query/useGetProducts';
import { useZusStore } from '../../store/useStore';
import classes from './Categories.module.scss';

const Categories = () => {
  const activeCategory = useZusStore(
    (state) => state.categories.activeCategory
  );

  const addToCart = useAddToCart();
  const increaseQuantity = useIncreaseQuantity();
  const { data: products } = useGetProducts(
    activeCategory === 'all' ? '' : activeCategory
  );

  const onAddToCartHandler = (product) => {
    if (product?.in_cart === 0) {
      addToCart.mutate({
        id: product?.id,
        type: product.type,
        quantity: 1,
      });
    } else {
      increaseQuantity.mutate(product?.item_id);
    }
  };

  return (
    <div>
      <CategoriesTab />

      <div className={classes.Categories}>
        {products?.data?.data?.items?.map((el) => (
          <Card
            id={el?.id}
            name={el?.name}
            key={el?.id}
            img={el?.image}
            price={el?.cost}
            onClick={() => onAddToCartHandler(el)}
          />
        ))}
        {activeCategory === 'all' &&
          products?.data?.data?.ingredients?.map((el) => (
            <Card
              id={el?.id}
              name={el?.name}
              key={el?.id}
              img={el?.image}
              price={el?.cost}
              onClick={() => onAddToCartHandler(el.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default Categories;
