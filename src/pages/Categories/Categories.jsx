import React from 'react';
import Card from '../../components/Card/Card';
import { useProductsStore } from '../../store/useStore';
import classes from './Categories.module.scss';

const Categories = () => {
  const products = useProductsStore((state) => state.products);
  const onAddToCart = useProductsStore((state) => state.addToCart);
  return (
    <div className={classes.Categories}>
      {products.map((el) => (
        <Card
          id={el.id}
          name={el.name}
          key={el.id}
          img={el.img}
          price={el.price}
          onClick={() => onAddToCart(el.id)}
        >
          {el.id}
        </Card>
      ))}
    </div>
  );
};

export default Categories;
