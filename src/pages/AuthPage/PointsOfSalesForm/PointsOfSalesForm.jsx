import { Col, message, Radio, Row } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import RadioButton from '../../../components/RadioButton/RadioButton';
import { setPointOfSale, setShiftId } from '../../../helper/localStorage';
import {
  useCheckPointOfSales,
  useGetPointsOfSales,
  useStartSheet,
} from '../../../hooks/query/useGetPointsOfSales';
import { useCurrentLang } from '../../../hooks/useCurrentLang';
import { useCurrentLoginType } from '../../../hooks/useCurrentLoginType';
import { locale } from '../../../locale';
import {
  loginTypeEnum,
  setIsLogin,
  setPosId,
  setSheet,
} from '../../../store/authSlice';
import classes from './PointsOfSalesForm.module.scss';

const PointsOfSalesForm = ({ onClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addStartSheet = useStartSheet();
  const [posValue, setPosValue] = useState(null);
  const { isWaiter } = useCurrentLoginType();
  const authLocale = locale.authPage;
  const [currentLang] = useCurrentLang();
  const checkPointOfSale = useCheckPointOfSales();
  const { data } = useGetPointsOfSales();
  console.log('PointsOfSalesForm  data', data);
  const setAuthPosId = (id) => dispatch(setPosId(id));
  const setAuthSheet = (sheet) => dispatch(setSheet(sheet));

  const onSubmitHandler = () => {
    if (!posValue) {
      message.error(authLocale.error.pointOfSalesError[currentLang]);
      return;
    }
    checkPointOfSale.mutate(posValue, {
      onSuccess: (newData) => {
        // console.log('onSubmitHandler  newData:>>>>>>', newData);
        const shiftId = newData.data.item.shift_id;
        const startSheet = newData.data.item.start_sheet;
        setPointOfSale(posValue);
        setAuthPosId(posValue);
        if (isWaiter) {
          onClick();
          return;
        }

        if (startSheet === 1) {
          addStartSheet.mutate({
            id: posValue,
            startBalance: 0,
          });
          return;
        }
        dispatch(setIsLogin(true));
        setShiftId(shiftId);
        setAuthSheet(shiftId);
        navigate('/categories');
      },
    });
  };
  return (
    <div>
      <div className={classes.PointsOfSalesForm__Form}>
        <Radio.Group
          name="pointsOfSale"
          value={posValue}
          onChange={(e) => {
            setPosValue(e.target.value);
          }}
          className={classes.PointsOfSalesForm__Form__Radios}
        >
          <Row gutter={[10, 10]}>
            {data?.data?.data?.pointOfSales.map((point) => (
              <Col key={point.id} span={12}>
                <RadioButton
                  value={point.id}
                  label={point.name}
                  style={{
                    width: '100%',
                    padding: 5,
                  }}
                />
              </Col>
            ))}
          </Row>
        </Radio.Group>
        <Button
          onClick={onSubmitHandler}
          large={false}
          type="primary"
          fullwidth
          isLoading={checkPointOfSale.isLoading}
        >
          اختار منفذ بيع
        </Button>
      </div>
    </div>
  );
};

export default PointsOfSalesForm;
