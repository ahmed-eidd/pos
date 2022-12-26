import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './CategoriesTabPane.module.scss';

const CategoriesTabPane = ({ activeKey, name, id, img }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/categories/${id}`);
      }}
      className={classNames(classes.CategoriesTabPane, {
        [classes['CategoriesTabPane--active']]: id.toString() === activeKey,
      })}
    >
      {img ? (
        <img className={classes.CategoriesTabPane__Img} src={img} alt="name" />
      ) : (
        <i
          className={classNames(
            'fa-solid fa-utensils',
            classes.CategoriesTabPane__Icon
          )}
        ></i>
      )}
      <p className={classes.CategoriesTabPane__Name}>{name}</p>
    </div>
  );
};

export default CategoriesTabPane;
