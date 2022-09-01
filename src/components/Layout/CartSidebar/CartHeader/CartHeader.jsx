import React from 'react';
import classes from './CartHeader.module.scss';
import TrashPng from '../../../../assets/trash.png';
import ThreeDotsPng from '../../../../assets/threedots.png';
import { locale } from '../../../../locale';
import { useCurrentLang } from '../../../../hooks/useCurrentLang';

const CartHeader = ({ onDeleteAll }) => {
  const [currentLang] = useCurrentLang();
  const cartLocale = locale.sidebar.cart;
  return (
    <div className={classes.CartHeader}>
      <img
        className={classes.CartHeader__TrashImg}
        onClick={onDeleteAll}
        src={TrashPng}
        alt='delete'
      />
      <h3 className={classes.CartHeader__Title}>
        {cartLocale.title[currentLang]}
      </h3>
      <img
        className={classes.CartHeader__ThreeDotsImg}
        src={ThreeDotsPng}
        alt='delete'
      />
    </div>
  );
};

export default CartHeader;
