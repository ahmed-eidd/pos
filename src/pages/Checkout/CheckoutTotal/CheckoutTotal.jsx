import { Divider } from 'antd';
import React from 'react';
import { useMemo } from 'react';
import Flex from '../../../components/Flex/Flex';
import Text from '../../../components/Text/Text';
import { useCurrentLang } from '../../../hooks/useCurrentLang';
import { locale } from '../../../locale';
import { currencyFormat } from '../../../services/utils';
import classes from './CheckoutTotal.module.scss';

const CheckoutTotal = ({ total = 0, vat = 0, shipping = 0 }) => {
  const [currentLang] = useCurrentLang();

  const orderlabels = locale.sidebar.cart.orderLables;
  const allTotal = useMemo(() => {
    return total + vat + shipping;
  }, [total, vat, shipping]);
  return (
    <Flex
      style={{
        padding: '18px',
      }}
      gap="17px"
      direction="column"
      className={classes.CheckoutTotal}
    >
      <Flex justify="space-between">
        <Text>
          {locale.global.currencyWithEgyptian[currentLang]}{' '}
          {currencyFormat(total)}
        </Text>
        <Text label>{orderlabels.total[currentLang]}</Text>
      </Flex>
      <Flex justify="space-between">
        <Text>
          {locale.global.currencyWithEgyptian[currentLang]}{' '}
          {currencyFormat(vat)}
        </Text>
        <Text label>{orderlabels.vat[currentLang]}</Text>
      </Flex>
      <Flex justify="space-between">
        <Text>
          {' '}
          {locale.global.currencyWithEgyptian[currentLang]}{' '}
          {currencyFormat(shipping)}
        </Text>
        <Text label>{orderlabels.shipping[currentLang]}</Text>
      </Flex>
      <Divider style={{ margin: '0' }} />
      <Flex justify="space-between">
        <Text color="primary">م. {currencyFormat(allTotal)}</Text>
        <Text label>{orderlabels.total[currentLang]}</Text>
      </Flex>
    </Flex>
  );
};

export default CheckoutTotal;
