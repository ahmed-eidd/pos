import { Collapse } from 'antd';
import React from 'react';
import classes from './ItemAccordion.module.scss';
import ArrowIcon from '../../assets/chevron-right.png';
import CounterBtns from '../CounterBtns/CounterBtns';
import TrashIcon from '../../assets/trash.png';
import CartIcon from '../../icons/SideMenuIcons/Cart/Cart';
import { locale } from '../../locale';
import { useCurrentLang } from '../../hooks/useCurrentLang';
import Spinner from '../Spinner/Spinner';
import { currencyFormat } from '../../services/utils';
import SingleCartItem from './SingleCartItem/SingleCartItem';

const ItemAccordion = ({
  items = [],
  onDelete,
  onIncrement,
  onDecrement,
  loading,
  actionsLoading,
  readOnly,
}) => {
  const [currentLang] = useCurrentLang();

  if (loading) {
    return (
      <Spinner
        style={{
          position: 'static !important',
          display: 'block',
          margin: 'auto',
        }}
      />
    );
  }
  return (
    <>
      {items.length > 0 ? (
        <Collapse
          expandIconPosition="end"
          collapsible={readOnly && 'disabled'}
          expandIcon={({ isActive }) => (
            <div>
              <img
                style={{
                  transform: isActive ? 'rotate(90deg)' : 'rotate(0)',
                  transition: 'transform .2s ease-in-out',
                }}
                src={ArrowIcon}
                alt="arrow"
              />
            </div>
          )}
          bordered={false}
          className={classes.ItemAccordion}
        >
          {items.map(item => (
            <SingleCartItem
              key={item?.id}
              item={item}
              onDelete={onDelete}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
          ))}
        </Collapse>
      ) : (
        <div className={classes.ItemAccordion__NoItems}>
          <CartIcon />
          <p>{locale.sidebar.cart.noitems[currentLang]}</p>
        </div>
      )}
    </>
  );
};

export default ItemAccordion;
