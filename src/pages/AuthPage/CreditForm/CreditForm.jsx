import { Form } from 'antd';
import React from 'react';
import Button from '../../../components/Button/Button';
import InputField from '../../../components/InputField/InputField';
import { useCurrentLang } from '../../../hooks/useCurrentLang';
import { locale } from '../../../locale';

const CreditForm = ({ onClick }) => {
  const [currentLang] = useCurrentLang();
  return (
    <Form
      onFinish={(values) => {
        console.log(values);
        onClick();
      }}
      layout='vertical'
    >
      <Form.Item name='credit' label={locale.authPage.creditLabel[currentLang]}>
        <InputField placeholder='ex: 5000' type='number' />
      </Form.Item>
      <Button type='primary' fullwidth>
        {locale.authPage.loginBtn[currentLang]}
      </Button>
    </Form>
  );
};

export default CreditForm;
