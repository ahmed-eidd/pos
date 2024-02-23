import { Col, Descriptions, Modal, Row, Spin, Statistic, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { axiosInstance } from '../../../../service/api';

const BalanceModal = ({ open, setOpen }) => {
  const sheet = useSelector((s) => s.auth?.sheet);
  const [currentBalance, setCurrentBalance] = useState(null);
  const [getBalanceLod, setGetBalanceLod] = useState(false);
  const handelShowCurrentBalance = async () => {
    const body = new FormData();
    body.append('point_of_sale_order_sheet_id', sheet);
    setGetBalanceLod(true);
    try {
      const { data } = await axiosInstance().post('/checkLockerBalance', body);
      if (data?.code === 200) {
        setCurrentBalance(data?.data);
      }
    } catch (error) {
      console.log('handelShowCurrentBalance  error:', error);
    }
    setGetBalanceLod(false);
  };

  useEffect(() => {
    if (open) {
      handelShowCurrentBalance();
    }
  }, [open]);
  return (
    <Modal
      visible={open}
      footer={null}
      onCancel={() => setOpen(false)}
      destroyOnClose
      width={400}
    >
      <Spin spinning={getBalanceLod}>
        <Descriptions
          bordered
          column={1}
          className='Descriptions'
          style={{ direction: 'rtl', width: '100%' }}
        >
          <Descriptions.Item label='الاجمالي'>
            {currentBalance?.amount}
          </Descriptions.Item>
          <Descriptions.Item label='كاش'>
            {currentBalance?.cash}
          </Descriptions.Item>
          <Descriptions.Item label='كريدت'>
            {currentBalance?.credit}
          </Descriptions.Item>
          <Descriptions.Item label='فيزا'>
            {currentBalance?.visa}
          </Descriptions.Item>
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default BalanceModal;
