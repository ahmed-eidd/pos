import React from 'react';
import Text from '../../Text/Text';
import InputField from '../../../components/InputField/InputField';
import Flex from '../../Flex/Flex';
import Button from '../../Button/Button';

const OpeningBalanceStep = ({ onClick, onClose }) => {
  return (
    <div>
      <Flex align='flex-start' direction='column' gap='8px'>
        <Text>الرصيد الختامي</Text>
        <InputField radius='md' placeholder='أدخل مبلغ الرصيد الختامي' />
      </Flex>
      <Flex style={{ marginTop: '30px' }} gap='12px'>
        <Button type='default' onClick={onClose} fullwidth>
          إلغاء
        </Button>
        <Button fullwidth onClick={onClick}>
          أدخل المبلغ
        </Button>
      </Flex>
    </div>
  );
};

export default OpeningBalanceStep;
