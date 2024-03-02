import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetActiveShifs,
  useGetStaff,
} from '../../../hooks/query/useWaiterLogin';
import { Button, Form, Select } from 'antd';
import InputField from '../../../components/InputField/InputField';
import { locale } from '../../../locale';
import { useCurrentLang } from '../../../hooks/useCurrentLang';
import { setCurrentUser, setIsLogin, setSheet } from '../../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const WaiterShiftForm = () => {
  const dispatch = useDispatch();
  const { data: activeShifts, isLoading: activeShiftsLoading } =
    useGetActiveShifs();
  const { mutate: getStaff, isLoading: getStaffLoading } = useGetStaff();
  const [currentLang] = useCurrentLang();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state?.auth?.currentUser);
  return (
    <Form
      onFinish={(values) => {
        getStaff(values?.serviceCode, {
          onSuccess: (res) => {
            const newData = res?.data;
            if (newData.validation?.length > 0 && !newData?.isActive) {
              message.error('هذا الشيف غير نشط، الرجاء المحاولة مرة اخري');
              return;
            }

            if (+newData?.isActive === 1) {
              dispatch(setSheet(values?.activeShift));
              dispatch(setCurrentUser(newData));
              dispatch(setIsLogin(true));
              navigate('/categories');
            }
          },
        });
      }}
      layout="vertical"
    >
      <Form.Item
        name="activeShift"
        label={'الشيفتات المتاحة'}
        rules={[{ required: true }]}
      >
        <Select size="large">
          {activeShifts?.map((el) => (
            <Select.Option value={el?.id}>
              {el?.id} - {currentUser?.name} - {el?.shift_start}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label={'كود السيرفز'}
        name="serviceCode"
        rules={[{ required: true }]}
      >
        <InputField type={'number'} />
      </Form.Item>
      <Button
        large={false}
        type="primary"
        fullwidth
        htmlType="submit"
        disabled={getStaffLoading || activeShiftsLoading}
      >
        {locale.authPage.loginBtn[currentLang]}
      </Button>
    </Form>
  );
};

export default WaiterShiftForm;
