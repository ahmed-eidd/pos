import React, { useMemo, useState } from 'react';
import { useEffect } from 'react';
// import { getToken } from '../../helper/localStorage';
import { useCurrentLang } from '../../hooks/useCurrentLang';
import { locale } from '../../locale';
import CreditForm from './CreditForm/CreditForm';
import FormLayout from './FormLayout/FormLayout';
import LoginForm from './LoginForm/LoginForm';
import PointsOfSalesForm from './PointsOfSalesForm/PointsOfSalesForm';
import { Radio } from 'antd';
import RadioButton from '../../components/RadioButton/RadioButton';
import classes from './AuthPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { loginTypeEnum, setLoginType } from '../../store/authSlice';
import WaiterShiftForm from './WaiterShiftForm/WaiterShiftForm';
import { useStartSheet } from '../../hooks/query/useGetPointsOfSales';
import { useCurrentLoginType } from '../../hooks/useCurrentLoginType';

const STEPS = {
  LOGIN_STEP: 'LOGIN_STEP',
  CHECKPOINTS_STEP: 'CHECKPOINTS_STEP',
  WAITER_SHIFT_STEP: 'WAITER_SHIFT_STEP',
  ADD_OPENING_AMOUNT_STEP: 'ADD_OPENING_AMOUNT_STEP',
};

const AuthPage = () => {
  const dispatch = useDispatch();
  const [currentLang] = useCurrentLang();
  const [currentForm, setCurrentForm] = useState(STEPS.LOGIN_STEP);
  const currentLoginType = useSelector((state) => state?.auth?.loginType);
  const addStartSheet = useStartSheet();
  const [currentTitles, setCurrentTitles] = useState({
    mainTitle: locale.authPage.welcome[currentLang],
    secondTitle: locale.authPage.loginTitle[currentLang],
  });

  const renderForm = useMemo(() => {
    switch (currentForm) {
      case STEPS.LOGIN_STEP: {
        setCurrentTitles({
          mainTitle: locale.authPage.welcome[currentLang],
          secondTitle: locale.authPage.loginTitle[currentLang],
        });
        return (
          <>
            <Radio.Group
              buttonStyle="solid"
              className={classes.Login__Type}
              value={currentLoginType}
              onChange={(e) => {
                dispatch(setLoginType(e.target.value));
              }}
            >
              <RadioButton label={'Cashier'} value={loginTypeEnum.cashier} />
              <RadioButton label={'Waiter'} value={loginTypeEnum.waiter} />
            </Radio.Group>
            <LoginForm
              onSuccess={(data) => {
                // console.log('LoginForm  data:', data);

                setCurrentForm(STEPS.CHECKPOINTS_STEP);
              }}
            />
          </>
        );
      }
      case STEPS.CHECKPOINTS_STEP: {
        setCurrentTitles({
          mainTitle: locale.authPage.welcome[currentLang],
          secondTitle: locale.authPage.selectPointOfSalesTitle[currentLang],
        });
        return (
          <PointsOfSalesForm
            onClick={() => {
              switch (currentLoginType) {
                case loginTypeEnum.waiter:
                  setCurrentForm(STEPS.WAITER_SHIFT_STEP);
                  return;
                default:
                  break;
              }
            }}
          />
        );
      }
      case STEPS.ADD_OPENING_AMOUNT_STEP: {
        setCurrentTitles({
          mainTitle: locale.authPage.creditMainTitle[currentLang],
          secondTitle: locale.authPage.creditTitle[currentLang],
        });
        return <CreditForm onClick={() => setCurrentForm(3)} />;
      }
      case STEPS.WAITER_SHIFT_STEP: {
        setCurrentTitles({
          mainTitle: 'يبانات الشيف الحالي`',
        });
        return <WaiterShiftForm />;
      }
      default:
        return null;
    }
  }, [currentForm, currentLang, currentLoginType, dispatch]);
  return <FormLayout {...currentTitles}>{renderForm}</FormLayout>;
};

export default AuthPage;
