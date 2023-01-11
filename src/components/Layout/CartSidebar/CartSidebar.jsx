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
import { useCurrentCartItems } from '../../../hooks/useCurrentCartItems';
import { currencyFormat } from '../../../services/utils';
import useCartInfo from '../../../api-hooks/cart/useCartInfo';

const CartSidebar = () => {
  const [currentLang] = useCurrentLang();
  const orderlabels = locale.sidebar.cart.orderLables;

  const { data: currentCartItem, isLoading: cartIsLoading } =
    useCurrentCartItems();
  console.log('CartSidebar  currentCartItem>>>>>>>>>>>>', currentCartItem);
  // const { cartInfo: currentCartItem, cartInfoLod: cartIsLoading } =
  //   useCartInfo();
  // console.log('CartSidebar  cartInfo', currentCartItem);

  return (
    <div className={classes.CartSidebar}>
      <CartHeader />
      <CartItems cartIsloading={cartIsLoading} data={currentCartItem} />
      <Flex
        style={{
          padding: '18px',
        }}
        gap="17px"
        direction="column"
      >
        <Divider style={{ margin: '0' }} />
        <Flex justify="space-between">
          <Text color="primary">
            جم {currencyFormat(currentCartItem?.total ?? 0)}
          </Text>
          <Text label>{orderlabels.total[currentLang]}</Text>
        </Flex>
      </Flex>
      <CartCounter
        count={currentCartItem?.items?.length}
        prices={currentCartItem?.total}
      />
    </div>
  );
};

export default CartSidebar;
