import { Checkbox, Input, Radio } from 'antd';
import React from 'react';
import Flex from '../../../components/Flex/Flex';
import InputField from '../../../components/InputField/InputField';
import Text from '../../../components/Text/Text';

export const DISCOUNT_TYPE = {
  percentage: 'percentage',
  value: 'value',
};
const DiscountInputs = ({
  isDiscount,
  setIsDiscount,
  discountType,
  discountValue,
  onDiscountValueChange,
  onDiscoutTypeChange,
  password,
  setPassword,
}) => {
  return (
    <Flex
      style={{ margin: '1rem 0' }}
      direction="column"
      align="flex-start"
      justify="center"
      gap="15px"
    >
      <Flex direction="row" justify="flex-start" align="center" gap="10px">
        <Text label weight="bold">
          تخفيض:
        </Text>
        <Checkbox
          checked={isDiscount}
          onChange={e => setIsDiscount(e.target.checked)}
        />
      </Flex>
      {isDiscount && (
        <>
          <Radio.Group
            onChange={event => onDiscoutTypeChange(event)}
            value={discountType}
          >
            <Flex gap="10px">
              <Radio.Button value={DISCOUNT_TYPE.percentage}>
                <p>نسبة مئوية</p>
              </Radio.Button>
              <Radio.Button value={DISCOUNT_TYPE.value}>
                <p>قيمة</p>
              </Radio.Button>
            </Flex>
          </Radio.Group>
          {/* <Text>الخصم</Text> */}
          <InputField
            value={discountValue}
            maxLength={discountType === DISCOUNT_TYPE.percentage ? 2 : ''}
            placeholder="اضف فيمة الخصم"
            onChange={onDiscountValueChange}
          />
          <Input.Password
            size="large"
            value={password}
            onChange={({ target }) => setPassword(target?.value)}
            placeholder="أدخل كلمة المرور"
          />
        </>
      )}
    </Flex>
  );
};

export default DiscountInputs;
