import { Form, Radio } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import PageLayout from '../../components/PageLayout/PageLayout';
import RadioButton from '../../components/RadioButton/RadioButton';
import { useCurrentLang } from '../../hooks/useCurrentLang';
import { locale } from '../../locale';
import classes from './CashMangment.module.scss';

const CashMangment = () => {
  const [currentLang] = useCurrentLang();
  const cashLocale = locale.cashMangment;
  return (
    <PageLayout
      title={cashLocale.title[currentLang]}
      className={classes.CashMangment}
    >
      <Form
        initialValues={{ cashType: 'delivery', cashAmount: '', commen: '' }}
        className={classes.CashMangment__Form}
        layout='vertical'
      >
        <Form.Item
          label={cashLocale.chooseCashType[currentLang]}
          name='cashType'
        >
          <Radio.Group
            className={classes.CashMangment__CashType}
            buttonStyle='solid'
          >
            <RadioButton
              value={'delivery'}
              label={cashLocale.cashTypeLabel_expanses[currentLang]}
            />
            <RadioButton
              value={'restaurant'}
              label={cashLocale.cashTypelabel_incomes[currentLang]}
            />
          </Radio.Group>
        </Form.Item>
        {/* <Text label>{cashLocale.chooseCashType[currentLang]}</Text> */}
        <Form.Item
          name='cashAmount'
          label={cashLocale.chooseCashType[currentLang]}
        >
          <InputField
            radius='md'
            placeholder={cashLocale.cashAmountPlaceholder[currentLang]}
          />
        </Form.Item>
        <Form.Item name='comment' label={cashLocale.comment[currentLang]}>
          <TextArea
            className={classes.CashMangment__Comment}
            placeholder={cashLocale.commentPlaceholder[currentLang]}
          />
        </Form.Item>
        <div className={classes.CashMangment__ActionBtns}>
          <Button type='defaulta' fullwidth>
            {cashLocale.cancel[currentLang]}
          </Button>
          <Button fullwidth>{cashLocale.send[currentLang]}</Button>
        </div>
      </Form>
    </PageLayout>
  );
};

export default CashMangment;
