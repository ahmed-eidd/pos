import React from 'react';
import classes from './CartHeader.module.scss';
import TrashPng from '../../../../assets/trash.png';
import ThreeDotsPng from '../../../../assets/threedots.png';
import { locale } from '../../../../locale';
import { useCurrentLang } from '../../../../hooks/useCurrentLang';
import { useZusStore } from '../../../../store/useStore';

const CartHeader = ({ onDeleteAll }) => {
  const [currentLang] = useCurrentLang();
  const cartLocale = locale.sidebar.cart;
  const deleteAllItems = useZusStore(
    (state) => state.products.deleteAllCartItems
  );
  return (
    <div className={classes.CartHeader}>
      <img
        className={classes.CartHeader__TrashImg}
        onClick={deleteAllItems}
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
