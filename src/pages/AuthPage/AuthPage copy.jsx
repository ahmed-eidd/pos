import React, { useMemo, useState } from 'react';
import { useEffect } from 'react';
// import { getToken } from '../../helper/localStorage';
import { useCurrentLang } from '../../hooks/useCurrentLang';
import { locale } from '../../locale';
import CreditForm from './CreditForm/CreditForm';
import FormLayout from './FormLayout/FormLayout';
import LoginForm from './LoginForm/LoginForm';
import PointsOfSalesForm from './PointsOfSalesForm/PointsOfSalesForm';

const STEPS = {
  LOGIN_STEP: 'LOGIN_STEP',
  CHECKPOINTS_STEP: 'CHECKPOINTS_STEP',
  ADD_OPENING_AMOUNT_STEP: 'ADD_OPENING_AMOUNT_STEP',
};

const AuthPage = () => {
  const [currentLang] = useCurrentLang();
  const [currentForm, setCurrentForm] = useState(STEPS.LOGIN_STEP);
  // console.log('AuthPage  currentForm', currentForm);
  const [currentTitles, setCurrentTitles] = useState({
    mainTitle: locale.authPage.welcome[currentLang],
    secondTitle: locale.authPage.loginTitle[currentLang],
  });
  // const token = getToken();
  useEffect(() => {
    // if (token) {
    //   setCurrentForm(STEPS.CHECKPOINTS_STEP);
    // }
    return () => setCurrentForm(STEPS.LOGIN_STEP);
  }, []);

  const renderForm = useMemo(() => {
    switch (currentForm) {
      case STEPS.LOGIN_STEP: {
        setCurrentTitles({
          mainTitle: locale.authPage.welcome[currentLang],
          secondTitle: locale.authPage.loginTitle[currentLang],
        });
        return (
          <LoginForm
            onSuccess={data => setCurrentForm(STEPS.CHECKPOINTS_STEP)}
          />
        );
      }
      case STEPS.CHECKPOINTS_STEP: {
        setCurrentTitles({
          mainTitle: locale.authPage.welcome[currentLang],
          secondTitle: locale.authPage.selectPointOfSalesTitle[currentLang],
        });
        return (
          <PointsOfSalesForm
            onClick={() => setCurrentForm(STEPS.ADD_OPENING_AMOUNT_STEP)}
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
      default:
        return null;
    }
  }, [currentForm, currentLang]);
  return <FormLayout {...currentTitles}>{renderForm}</FormLayout>;
};

export default AuthPage;
