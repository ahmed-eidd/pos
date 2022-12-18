import React from 'react';
import Flex from '../../../components/Flex/Flex';
import { useCurrentLang } from '../../../hooks/useCurrentLang';
import { locale } from '../../../locale';
import classes from './SingleSavedOrder.module.scss';

const SingleSavedOrder = ({ onClick, name, date }) => {
  const savedOrderLocale = locale.savedOrders;
  const [currentLang] = useCurrentLang();
  return (
    <div onClick={onClick} className={classes.SingleSavedOrder}>
      <Flex justify='space-between'>
        <p className={classes.SingleSavedOrder__CustomerName}>
          {name || savedOrderLocale.validation.noName[currentLang]}
        </p>
        <p className={classes.SingleSavedOrder__Label}>{savedOrderLocale.customerNameLabel[currentLang]}</p>
      </Flex>
      <p className={classes.SingleSavedOrder__Date}>{date || '1/1/2022'}</p>
    </div>
  );
};

export default SingleSavedOrder;
