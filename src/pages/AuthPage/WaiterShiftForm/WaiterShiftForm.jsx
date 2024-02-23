import React from 'react';
import classes from './WaiterShiftForm.module.scss';
import { getPointOfSale } from '../../../helper/localStorage';
import { useSelector } from 'react-redux';
import { useGetActiveShifs } from '../../../hooks/query/useWaiterLogin';
import { Button, Form, Select } from 'antd';
import InputField from '../../../components/InputField/InputField';
import dayjs from 'dayjs';

const WaiterShiftForm = () => {
  const { data: activeShifts } = useGetActiveShifs();
  const currentUser = useSelector((state) => state?.auth?.currentUser);
  console.log({ activeShifts });
  return (
    <Form onFinish={(values) => {}} layout="vertical">
      <Form.Item name="activeshift" label={'الشيفتات المتاحة'}>
        <Select size="large">
          {activeShifts?.map((el) => (
            <Select.Option value={el?.id}>
              {el?.id} - {el?.name} -{' '}
              {dayjs(el?.shift_start).format('YYYY-MM-DD HH:MM')}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label={'كود السيرفز'}>
        <InputField type={'number'} />
      </Form.Item>
      <Button large={false} type="primary" fullwidth>
        {''}
      </Button>
    </Form>
  );
};

export default WaiterShiftForm;
