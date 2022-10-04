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

const { Panel } = Collapse;

const Header = ({ text, count, loading }) => {
  return (
    <div className={classes.ItemAccordion__Header}>
      <p className={classes.ItemAccordion__Header__Count}>{count}</p>
      <p className={classes.ItemAccordion__Header__Text}>{text}</p>
      <Spinner
        spinning={loading}
        style={{
          marginLeft: 'auto',
          marginRight: '10px',
        }}
        size={20}
      />
    </div>
  );
};

const ItemAccordion = ({
  items = [],
  onDelete,
  onIncrement,
  onDecrement,
  loading,
  actionsLoading,
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
          expandIconPosition='end'
          expandIcon={({ isActive }) => (
            <div>
              <img
                style={{
                  transform: isActive ? 'rotate(90deg)' : 'rotate(0)',
                  transition: 'transform .2s ease-in-out',
                }}
                src={ArrowIcon}
                alt='arrow'
              />
            </div>
          )}
          bordered={false}
          className={classes.ItemAccordion}
        >
          {items.map((item) => {
            return (
              <Panel
                key={item.id}
                header={
                  <>
                    <Header
                      // loading={actionsLoading.some((el) => el === true)}
                      loading={actionsLoading.some((el) => el === true)}
                      text={item.productName}
                      count={item.quantity}
                    />
                  </>
                }
              >
                <div className={classes.ItemAccordion__Panel}>
                  <div className={classes.ItemAccordion__Panel__CounterWrapper}>
                    <CounterBtns
                      onIncrement={() => onIncrement(item?.id)}
                      onDecrement={() => onDecrement(item?.id)}
                      count={+item.quantity}
                      disableDecBtn={+item.quantity < 2}
                    />
                    <p
                      className={
                        classes.ItemAccordion__Panel__CounterWrapper__Count
                      }
                    >
                      {`${item.quantity}x${item.price * item.quantity}EGP`}
                    </p>
                  </div>
                  <img
                    className={
                      classes.ItemAccordion__Panel__CounterWrapper__Delete
                    }
                    src={TrashIcon}
                    alt='delete'
                    onClick={() => onDelete(item?.id)}
                  />
                </div>
              </Panel>
            );
          })}
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
