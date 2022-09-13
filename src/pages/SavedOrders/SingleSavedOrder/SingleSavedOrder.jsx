import React from 'react';
import Flex from '../../../components/Flex/Flex';
import classes from './SingleSavedOrder.module.scss';

const SingleSavedOrder = ({ onClick }) => {
  return (
    <div onClick={onClick} className={classes.SingleSavedOrder}>
      <Flex justify='space-between'>
        <p className={classes.SingleSavedOrder__CustomerName}>محمود سيف</p>
        <p className={classes.SingleSavedOrder__Label}>اسم الزبون</p>
      </Flex>
      <p className={classes.SingleSavedOrder__Date}>10/05/2022 10:30 مساءً</p>
    </div>
  );
};

export default SingleSavedOrder;
