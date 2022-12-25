import { Form } from 'antd';
import React from 'react';
import Button from '../../../components/Button/Button';
import InputField from '../../../components/InputField/InputField';
import { useLogin } from '../../../hooks/query/useAuth';
import { useCurrentLang } from '../../../hooks/useCurrentLang';
import { locale } from '../../../locale';

const LoginForm = ({ onClick, onSuccess }) => {
  const [currentLang] = useCurrentLang();
  const { mutate, isLoading } = useLogin();
  return (
    <Form
      onFinish={values => {
        const body = new FormData();
        body.append('name', values.email);
        body.append('password', values.password);
        mutate(body, {
          onSuccess: newData => {
            if (newData.data.validation.length > 0) return;
            onSuccess();
          },
        });
      }}
      layout="vertical"
      style={{
        width: '100%',
      }}
    >
      <Form.Item name="email" label={locale.authPage.emailLabel[currentLang]}>
        <InputField />
      </Form.Item>
      <Form.Item
        name="password"
        label={locale.authPage.passwordLabel[currentLang]}
      >
        <InputField type="password" />
      </Form.Item>
      <Button isLoading={isLoading} large={false} type="primary" fullwidth>
        {locale.authPage.loginBtn[currentLang]}
      </Button>
    </Form>
  );
};

export default LoginForm;
