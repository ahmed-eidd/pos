import React from 'react';
import { useCurrentLang } from '../../hooks/useCurrentLang';
import { locale } from '../../locale';
import classes from './Card.module.scss';

const Card = ({ img, name, id, price, onClick }) => {
  const [currentLang] = useCurrentLang();
  return (
    <div onClick={onClick} key={id} className={classes.Card}>
      <img src={img} alt='product' className={classes.Card__Img} />

      {price ? (
        <div className={classes.Card__TextWrapper}>
          <p className={classes.Card__Text}>{name}</p>
          <p className={classes.Card__Price}>
            {price}
            <span>
              {` ${locale.global.currencyWithEgyptian[currentLang]}`}{' '}
            </span>
          </p>
        </div>
      ) : (
        <p className={classes.Card__SingleText}>{name}</p>
      )}
    </div>
  );
};

export default Card;
