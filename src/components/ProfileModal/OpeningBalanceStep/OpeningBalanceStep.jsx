import React from 'react';
import Text from '../../Text/Text';
import InputField from '../../../components/InputField/InputField';
import Flex from '../../Flex/Flex';
import Button from '../../Button/Button';
import { Form, message } from 'antd';
import classes from './OpeningBalanceStep.module.scss';
import { useEndSheet } from '../../../hooks/query/useGetPointsOfSales';

const OpeningBalanceStep = ({ onClick, onClose }) => {
  const endSheet = useEndSheet();
  return (
    <Form
      className={classes.OpeningBalacneStep}
      onFinish={(values) => {
        endSheet.mutate(values.balance, {
          onSuccess: (data) => {
            if (data.data.validation.length > 0) {
              message.error(data.data.validation[0]);
            }
            onClick(values.balance);
          },
        });
      }}
    >
      <Flex align='flex-start' direction='column' justify='center' gap='8px'>
        <Text>الرصيد الختامي</Text>
        <Form.Item
          rules={[{ required: true, message: 'أدخل الرصيد الختامي' }]}
          name='balance'
        >
          <InputField
            radius='md'
            type='number'
            placeholder='أدخل مبلغ الرصيد الختامي'
          />
        </Form.Item>
      </Flex>
      <Flex style={{ marginTop: '30px' }} gap='12px'>
        <Button type='default' onClick={onClose} fullwidth>
          إلغاء
        </Button>
        <Button htmlType='submit' fullwidth>
          أدخل المبلغ
        </Button>
      </Flex>
    </Form>
  );
};

export default OpeningBalanceStep;
