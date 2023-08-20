import { Button, Collapse, Input, message, Popconfirm } from 'antd';
import React, { useState } from 'react';
import classes from './ItemAccordion.module.scss';
import ArrowIcon from '../../assets/chevron-right.png';
import CounterBtns from '../CounterBtns/CounterBtns';
import TrashIcon from '../../assets/trash.png';
import CartIcon from '../../icons/SideMenuIcons/Cart/Cart';
import { locale } from '../../locale';
import { useCurrentLang } from '../../hooks/useCurrentLang';
import Spinner from '../Spinner/Spinner';
import { currencyFormat } from '../../services/utils';
import { useRemoveSavedItem } from '../../hooks/query/useCart';

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
  onChangeCount,
  loading,
  actionsLoading,
  readOnly,
  savedOrder,
}) => {
  const [currentLang] = useCurrentLang();
  const [password, setPassword] = useState('');

  const handleDelteSavedItem = itemId => {
    console.log('password:', password);
    if (!password) return message.warning('الرجاء إدخال كلمة مرور');
    onDelete(itemId, password);
    setPassword('');
  };

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
          accordion
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
          {items.map(item => {
            const itemId = !!item?.is_saved ? item?.itemId : item?.id;
            return (
              <Panel
                key={itemId}
                header={
                  <>
                    <Header
                      // loading={actionsLoading?.some(el => el === true)}
                      loading={false}
                      text={item.productName}
                      count={item.quantity}
                    />
                  </>
                }
              >
                <div className={classes.ItemAccordion__Panel}>
                  <div className={classes.ItemAccordion__Panel__CounterWrapper}>
                    {!item?.is_saved && (
                      <CounterBtns
                        onIncrement={() => onIncrement(itemId)}
                        onDecrement={() => onDecrement(itemId)}
                        onChangeCount={count => onChangeCount(itemId, count)}
                        count={+item.quantity}
                        disableDecBtn={+item.quantity < 2}
                        actionsLoading={actionsLoading}
                      />
                    )}
                    <p
                      className={
                        classes.ItemAccordion__Panel__CounterWrapper__Count
                      }
                    >
                      {`${item.quantity}x${currencyFormat(
                        item?.price * item.quantity
                      )}EGP`}
                    </p>
                  </div>
                  {!!item?.is_saved ? (
                    <Popconfirm
                      placement="left"
                      title={
                        <div>
                          <h4 style={{ marginBottom: 4 }}>حذف هذا العنصر؟</h4>
                          <Input.Password
                            value={password}
                            onChange={({ target }) =>
                              setPassword(target?.value)
                            }
                            placeholder="أدخل كلمة المرور"
                          />
                        </div>
                      }
                      okText="نعم"
                      cancelText="لا"
                      onConfirm={() => handleDelteSavedItem(itemId)}
                      onOpenChange={() => console.log('open change')}
                    >
                      <Button
                        type="link"
                        icon={<img src={TrashIcon} alt="delete" width={24} />}
                        // onClick={() => onDelete(itemId)}
                        loading={actionsLoading?.remove}
                      />
                    </Popconfirm>
                  ) : (
                    <Button
                      type="link"
                      icon={<img src={TrashIcon} alt="delete" width={24} />}
                      onClick={() => onDelete(itemId)}
                      loading={actionsLoading?.remove}
                    />
                  )}
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
