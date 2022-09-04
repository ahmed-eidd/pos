import { Divider } from 'antd';
import React from 'react';
import Flex from '../../../components/Flex/Flex';
import Text from '../../../components/Text/Text';
import { useCurrentLang } from '../../../hooks/useCurrentLang';
import { locale } from '../../../locale';
import classes from './CheckoutTotal.module.scss';

const CheckoutTotal = () => {
  const [currentLang] = useCurrentLang();
  const orderlabels = locale.sidebar.cart.orderLables;
  return (
    <Flex
      style={{
        padding: '18px',
      }}
      gap='17px'
      direction='column'
      className={classes.CheckoutTotal}
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
  );
};

export default CheckoutTotal;
