import React from 'react';
import Flex from '../../../components/Flex/Flex';
import classes from './SingleSavedOrder.module.scss';

const SingleSavedOrder = ({ onClick, name, date }) => {
  return (
    <div onClick={onClick} className={classes.SingleSavedOrder}>
      <Flex justify='space-between'>
        <p className={classes.SingleSavedOrder__CustomerName}>{name}</p>
        <p className={classes.SingleSavedOrder__Label}>اسم الزبون</p>
      </Flex>
      <p className={classes.SingleSavedOrder__Date}>{date}</p>
    </div>
  );
};

export default SingleSavedOrder;
