import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import CategoriesTab from '../../components/CategoriesTabs/CategoriesTabs';
import { useProductsStore } from '../../store/useStore';
import classes from './Categories.module.scss';

const Categories = () => {
  const products = useProductsStore((state) => state.products);
  const onAddToCart = useProductsStore((state) => state.addToCart);
  const navigate = useNavigate();
  return (
    <div>
      <CategoriesTab />
      <Routes>
        <Route
          path='all'
          element={
            <div className={classes.Categories}>
              {products.map((el) => (
                <Card
                  id={el.id}
                  name={el.name}
                  key={el.id}
                  img={el.img}
                  // price={el.price}
                  onClick={() => navigate(el.name)}
                >
                  {el.id}
                </Card>
              ))}
            </div>
          }
        />

        <Route
          path='pizza'
          element={
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
          }
        />
      </Routes>
    </div>
  );
};

export default Categories;
