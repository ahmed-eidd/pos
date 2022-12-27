import { message, Radio } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import RadioButton from '../../../components/RadioButton/RadioButton';
import { setPointOfSale, setShiftId } from '../../../helper/localStorage';
import {
  useCheckPointOfSales,
  useGetPointsOfSales,
} from '../../../hooks/query/useGetPointsOfSales';
import { useCurrentLang } from '../../../hooks/useCurrentLang';
import { locale } from '../../../locale';
import { setPosId, setSheet } from '../../../store/authSlice';
import classes from './PointsOfSalesForm.module.scss';

const PointsOfSalesForm = ({ onClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [posValue, setPosValue] = useState(null);
  const authLocale = locale.authPage;
  const [currentLang] = useCurrentLang();
  const checkPointOfSale = useCheckPointOfSales();
  const { data } = useGetPointsOfSales();
  console.log('PointsOfSalesForm  data', data);
  const setAuthPosId = id => dispatch(setPosId(id));
  const setAuthSheet = sheet => dispatch(setSheet(sheet));

  const onSubmitHandler = () => {
    if (!posValue) {
      message.error(authLocale.error.pointOfSalesError[currentLang]);
      return;
    }
    checkPointOfSale.mutate(posValue, {
      onSuccess: newData => {
        const startSheet = newData.data.item.start_sheet;
        const shiftId = newData.data.item.shift_id;
        setPointOfSale(posValue);
        setAuthPosId(posValue);
        if (startSheet === 1) {
          onClick();
          return;
        }
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
          onChange={e => {
            setPosValue(e.target.value);
          }}
          className={classes.PointsOfSalesForm__Form__Radios}
        >
          {data?.data?.data?.pointOfSales.map(point => (
            <RadioButton key={point.id} value={point.id} label={point.name} />
          ))}
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
