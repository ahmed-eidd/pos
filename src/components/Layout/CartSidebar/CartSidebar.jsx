import React from 'react';
import classes from './CartSidebar.module.scss';
import CartHeader from './CartHeader/CartHeader';
import CartCounter from './CartCounter/CartCounter';
import { Divider } from 'antd';
import Text from '../../Text/Text';
import Flex from '../../Flex/Flex';
import { useCurrentLang } from '../../../hooks/useCurrentLang';
import { locale } from '../../../locale';
import CartItems from './CartItems/CartItems';
import { useGetCart } from '../../../hooks/query/useCart';

const CartSidebar = () => {
  const [currentLang] = useCurrentLang();
  const orderlabels = locale.sidebar.cart.orderLables;
  const { data } = useGetCart();

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
        {/* <Flex justify='space-between'> */}
        {/* <Text>100 جنيه مصري</Text>
          <Text label>{orderlabels.subtotal[currentLang]}</Text>
        </Flex>
        <Flex justify='space-between'>
          <Text>جنيه مصري 5.5</Text>
          <Text label>{orderlabels.vat[currentLang]}</Text>
        </Flex>
        <Flex justify='space-between'>
          <Text>جنيه مصري 50</Text>
          <Text label>{orderlabels.shipping[currentLang]}</Text>
        </Flex> */}
        <Divider style={{ margin: '0' }} />
        <Flex justify='space-between'>
          <Text color='primary'>م. {data?.total ?? 0}</Text>
          <Text label>{orderlabels.total[currentLang]}</Text>
        </Flex>
      </Flex>
      <CartCounter count={data?.items?.length ?? 0} prices={data?.total ?? 0} />
    </div>
  );
};

export default CartSidebar;
