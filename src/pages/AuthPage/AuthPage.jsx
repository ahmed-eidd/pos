import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useCurrentLang } from '../../hooks/useCurrentLang';
import { locale } from '../../locale';
import CreditForm from './CreditForm/CreditForm';
import FormLayout from './FormLayout/FormLayout';
import LoginForm from './LoginForm/LoginForm';
import SecretCodeForm from './SecretCodeForm/SecretCodeForm';

const AuthPage = () => {
  const [currentLang] = useCurrentLang();
  const [currentForm, setCurrentForm] = useState(1);
  const [currentTitles, setCurrentTitles] = useState({
    mainTitle: locale.authPage.welcome[currentLang],
    secondTitle: locale.authPage.loginTitle[currentLang],
  });

  const renderForm = useMemo(() => {
    switch (currentForm) {
      case 1: {
        setCurrentTitles({
          mainTitle: locale.authPage.welcome[currentLang],
          secondTitle: locale.authPage.loginTitle[currentLang],
        });
        return <LoginForm onClick={() => setCurrentForm(2)} />;
      }
      case 2: {
        setCurrentTitles({
          mainTitle: locale.authPage.creditMainTitle[currentLang],
          secondTitle: locale.authPage.creditTitle[currentLang],
        });
        return <CreditForm onClick={() => setCurrentForm(3)} />;
      }
      case 3: {
        setCurrentTitles({
          mainTitle: locale.authPage.secretCodeTitle[currentLang],
          secondTitle: locale.authPage.secretCodeSecondTitle[currentLang],
        });
        return <SecretCodeForm onClick={() => setCurrentForm(1)} />;
      }
      default:
        return null;
    }
  }, [currentForm, currentLang]);
  return <FormLayout {...currentTitles}>{renderForm}</FormLayout>;
};

export default AuthPage;
