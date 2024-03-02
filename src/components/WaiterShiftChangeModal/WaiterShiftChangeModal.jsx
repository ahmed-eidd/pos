import { Form, message, Modal } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useGetStaff } from '../../hooks/query/useWaiterLogin'
import { setCurrentUser, setIsLogin, setSheet } from '../../store/authSlice'
import { setWaiterShiftChangeModaClose } from '../../store/waiterShiftChangeModalSlice'
import InputField from '../InputField/InputField'

const WaiterShiftChangeModal = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector((state) => state?.WaiterShiftChangeModal?.open)
  const { mutate: getStaff } = useGetStaff()
  return (
    <Modal open={isOpen} onCancel={() => dispatch(setWaiterShiftChangeModaClose())}>

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
                Navigate('/categories');
              }
            },
          });
        }}
        layout="vertical"
      >

        <Form.Item
          label={'كود السيرفز'}
          name="serviceCode"
          rules={[{ required: true }]}
        >
          <InputField type={'number'} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default WaiterShiftChangeModal
