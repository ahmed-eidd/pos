import React from 'react';
import classes from './AuthPage.module.scss';
import AuthImage from '../../assets/authpage.jpg';
import { locale } from '../../locale';
import { useCurrentLang } from '../../hooks/useCurrentLang';
import { Form } from 'antd';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';

const AuthPage = () => {
  const [currentLang, setCurrentLang] = useCurrentLang();
  console.log(locale.authPage.welcome[currentLang]);
  return (
    <div className={classes.AuthPage}>
      <div
        onClick={() => setCurrentLang(currentLang === 'en' ? 'ar' : 'en')}
        className={classes.AuthPage__Image}
      >
        <img src={AuthImage} alt='login' />
      </div>
      <div className={classes.AuthPage__Form}>
        <div className={classes.AuthPage__Form__Content}>
          <h1>{locale.authPage.welcome[currentLang]}</h1>
          <Form
            onFinish={(values) => {
              console.log(values);
            }}
            layout='vertical'
          >
            <Form.Item
              name='email'
              label={locale.authPage.emailLabel[currentLang]}
            >
              <InputField />
            </Form.Item>
            <Form.Item
              name='password'
              label={locale.authPage.passwordLabel[currentLang]}
            >
              <InputField type='password' />
            </Form.Item>
            <Button type='primary'>
              {locale.authPage.loginBtn[currentLang]}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
