import React from 'react';
import classes from '../AuthPage.module.scss';
import AuthImage from '../../../assets/authpage.jpg';
import { useCurrentLang } from '../../../hooks/useCurrentLang';

const FormLayout = ({ children, mainTitle, secondTitle = '' }) => {
  const [currentLang, setCurrentLang] = useCurrentLang();
  return (
    <div className={classes.AuthPage}>
      <div
        onClick={() => setCurrentLang(currentLang === 'en' ? 'ar' : 'en')}
        className={classes.AuthPage__Image}
      >
        <img src={AuthImage} alt="login" />
      </div>

      <div className={classes.AuthPage__Form}>
        <div className={classes.AuthPage__Form__Content}>
          <div className={classes.AuthPage__Form__Content__Titles}>
            <h1 className={classes.AuthPage__Form__Content__MainTitle}>
              {mainTitle}
            </h1>
            <h2 className={classes.AuthPage__Form__Content__SecondTitle}>
              {secondTitle}
            </h2>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
