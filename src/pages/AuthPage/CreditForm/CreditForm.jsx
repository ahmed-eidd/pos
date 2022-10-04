import { Form } from 'antd';
import React from 'react';
import Button from '../../../components/Button/Button';
import InputField from '../../../components/InputField/InputField';
import { getPointOfSale } from '../../../helper/localStorage';
import { useStartSheet } from '../../../hooks/query/useGetPointsOfSales';
import { useCurrentLang } from '../../../hooks/useCurrentLang';
import { locale } from '../../../locale';

const CreditForm = ({ onClick }) => {
  const [currentLang] = useCurrentLang();
  const addStartSheet = useStartSheet();
  const pos = getPointOfSale();
  return (
    <Form
      onFinish={(values) => {
        addStartSheet.mutate({
          id: pos,
          startBalance: values.credit,
        });
      }}
      layout='vertical'
    >
      <Form.Item name='credit' label={locale.authPage.creditLabel[currentLang]}>
        <InputField placeholder='ex: 5000' type='number' />
      </Form.Item>
      <Button large={false} type='primary' fullwidth>
        {locale.authPage.loginBtn[currentLang]}
      </Button>
    </Form>
  );
};

export default CreditForm;
