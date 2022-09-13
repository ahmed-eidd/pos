import { Form } from 'antd';
import React from 'react';
import Button from '../../../components/Button/Button';
import InputField from '../../../components/InputField/InputField';
import { useCurrentLang } from '../../../hooks/useCurrentLang';
import { locale } from '../../../locale';

const LoginForm = ({ onClick }) => {
  const [currentLang] = useCurrentLang();
  return (
    <Form
      onFinish={(values) => {
        onClick();
      }}
      layout='vertical'
      style={{
        width: '100%',
      }}
    >
      <Form.Item name='email' label={locale.authPage.emailLabel[currentLang]}>
        <InputField />
      </Form.Item>
      <Form.Item
        name='password'
        label={locale.authPage.passwordLabel[currentLang]}
      >
        <InputField type='password' />
      </Form.Item>
      <Button large={false} type='primary' fullwidth>
        {locale.authPage.loginBtn[currentLang]}
      </Button>
    </Form>
  );
};

export default LoginForm;
