import React, { useMemo } from 'react';
import classes from './CartSidebar.module.scss';
import CartHeader from './CartHeader/CartHeader';
import CartCounter from './CartCounter/CartCounter';
import { useZusStore } from '../../../store/useStore';
import shallow from 'zustand/shallow';
import { Divider } from 'antd';
import Text from '../../Text/Text';
import Flex from '../../Flex/Flex';
import { useCurrentLang } from '../../../hooks/useCurrentLang';
import { locale } from '../../../locale';
import CartItems from './CartItems/CartItems';

const CartSidebar = () => {
  const [currentLang] = useCurrentLang();
  const orderlabels = locale.sidebar.cart.orderLables;
  const cartItems = useZusStore((state) => state.products.cart, shallow);
  const cartPrices = useMemo(
    () =>
      cartItems.reduce((prev, curr) => prev + curr.price * curr.quantity, 0),
    [cartItems]
  );

  return (
    <div className={classes.CartSidebar}>
      <CartHeader />
      <CartItems />
      <Flex
        style={{
          padding: '18px',
        }}
        gap='17px'
        direction='column'
      >
        <Flex justify='space-between'>
          <Text>100 جنيه مصري</Text>
          <Text label>{orderlabels.subtotal[currentLang]}</Text>
        </Flex>
        <Flex justify='space-between'>
          <Text>جنيه مصري 5.5</Text>
          <Text label>{orderlabels.vat[currentLang]}</Text>
        </Flex>
        <Flex justify='space-between'>
          <Text>جنيه مصري 50</Text>
          <Text label>{orderlabels.shipping[currentLang]}</Text>
        </Flex>
        <Divider style={{ margin: '0' }} />
        <Flex justify='space-between'>
          <Text color='primary'>م. 105.5</Text>
          <Text label>{orderlabels.total[currentLang]}</Text>
        </Flex>
      </Flex>
      <CartCounter count={cartItems.length} prices={cartPrices} />
    </div>
  );
};

export default CartSidebar;
