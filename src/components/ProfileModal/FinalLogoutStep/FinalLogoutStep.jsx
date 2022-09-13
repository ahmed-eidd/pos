import React from 'react';
import Button from '../../Button/Button';
import Flex from '../../Flex/Flex';
import Text from '../../Text/Text';

const FinalLogoutStep = ({ onClick, onClose }) => {
  return (
    <div>
      <Flex align='flex-start' direction='column' gap='8px'>
        <Text size='large'>تسجيل خروج</Text>
        <Text block label>
          هل أنت متأكد أنك تريد تسجيل الخروج؟
        </Text>{' '}
      </Flex>
      <Flex style={{ marginTop: '30px' }} gap='12px'>
        <Button onClick={onClose} type='default' fullwidth>
          إلغاء
        </Button>
        <Button fullwidth onClick={onClick}>
          تسجيل خروج
        </Button>
      </Flex>
    </div>
  );
};

export default FinalLogoutStep;
