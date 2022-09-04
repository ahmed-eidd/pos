import { Form } from 'antd';
import React from 'react';
import Button from '../../../components/Button/Button';
import InputField from '../../../components/InputField/InputField';
import { useCurrentLang } from '../../../hooks/useCurrentLang';
import { locale } from '../../../locale';

const SecretCodeForm = ({ onClick }) => {
  const [currentLang] = useCurrentLang();
  return (
    <Form
      onFinish={(values) => {
        onClick();
      }}
      layout='vertical'
    >
      <Form.Item
        name='secretCode'
        label={locale.authPage.secretCodeLabel[currentLang]}
      >
        <InputField placeholder='ex: 5000' type='number' />
      </Form.Item>
      <Button type='primary' fullwidth>
        {locale.authPage.loginBtn[currentLang]}
      </Button>
    </Form>
  );
};

export default SecretCodeForm;
