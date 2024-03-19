import { css } from "@emotion/css";
import { Checkbox, Input, InputNumber, Radio } from "antd";
import React from "react";
import Flex from "../../../components/Flex/Flex";
import Text from "../../../components/Text/Text";

export const DISCOUNT_TYPE = {
  percentage: "percentage",
  value: "value",
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
  const DiscountInputsStyles = css`
    .InputNumber {
      width: 100%;
      border-radius: 10px;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  `;
  return (
    <Flex
      style={{ margin: "1rem 0" }}
      direction="column"
      align="flex-start"
      justify="center"
      gap="15px"
      className={DiscountInputsStyles}
    >
      <Flex direction="row" justify="flex-start" align="center" gap="10px">
        <Text label weight="bold">
          تخفيض:
        </Text>
        <Checkbox
          checked={isDiscount}
          onChange={(e) => setIsDiscount(e.target.checked)}
        />
      </Flex>
      {isDiscount && (
        <>
          <Radio.Group
            onChange={(event) => onDiscoutTypeChange(event)}
            value={discountType}
          >
            <Flex gap="10px">
              <Radio.Button value={DISCOUNT_TYPE.value}>
                <p>قيمة</p>
              </Radio.Button>
              <Radio.Button value={DISCOUNT_TYPE.percentage}>
                <p>نسبة مئوية</p>
              </Radio.Button>
            </Flex>
          </Radio.Group>

          <InputNumber
            value={discountValue}
            // max={discountType === DISCOUNT_TYPE.percentage ? 100 : undefined}
            placeholder={
              discountType === DISCOUNT_TYPE.percentage
                ? "اضف نسبة الخصم"
                : "اضف فيمة الخصم"
            }
            onChange={onDiscountValueChange}
            className="InputNumber"
          />
          <Input.Password
            size="large"
            value={password}
            onChange={({ target }) => setPassword(target?.value)}
            placeholder="أدخل كلمة المرور"
            className="InputNumber"
          />
        </>
      )}
    </Flex>
  );
};

export default DiscountInputs;
