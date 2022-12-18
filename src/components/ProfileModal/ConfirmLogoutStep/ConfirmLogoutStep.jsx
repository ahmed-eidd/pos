import React from 'react';
import Button from '../../Button/Button';
import Flex from '../../Flex/Flex';
import Text from '../../Text/Text';

const ConfirmLogoutStep = ({ onClick, onClose }) => {
  return (
    <div>
      <Flex align='flex-start' direction='column' gap='8px'>
        <Text size='large'>تسجيل خروج</Text>
        <Text label>
          لا يمكنك السماح بتسجيل الخروج حتى تقوم بإدخال مبلغ الرصيد الختامي
        </Text>
      </Flex>
      <Flex style={{ marginTop: '30px' }} gap='12px'>
        <Button type='default' onClick={onClose} fullwidth>
          إلغاء
        </Button>
        <Button onClick={onClick} fullwidth>
          أدخل المبلغ
        </Button>
      </Flex>
    </div>
  );
};

export default ConfirmLogoutStep;
