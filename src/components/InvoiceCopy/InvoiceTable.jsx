import React from 'react';
import { css } from '@emotion/css';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { currencyFormat } from '../../services/utils';

const InvoiceTable = ({ invoice, paymentReccived, ...rest }) => {
  const currentUser = useSelector((s) => s?.auth?.currentUser);
  return (
    <div>
      {!!currentUser?.logo && <img src={currentUser?.logo} alt='POS' />}
    </div>
  );
};

export default InvoiceTable;
