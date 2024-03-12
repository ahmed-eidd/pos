import { Form, message, Modal } from "antd";
import Button from "../Button/Button";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetStaff } from "../../hooks/query/useWaiterLogin";
import { setCurrentUser, setIsLogin, setSheet } from "../../store/authSlice";
import { setWaiterShiftChangeModaClose } from "../../store/waiterShiftChangeModalSlice";
import Flex from "../Flex/Flex";
import InputField from "../InputField/InputField";
import { modifiyUserLocalStorage } from "../../helper/modifyUserLocalStorage";

const WaiterShiftChangeModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector((state) => state?.waiterChageModal?.open);
  const onClose = () => {
    dispatch(setWaiterShiftChangeModaClose());
  };
  const { mutate: getStaff, isLoading } = useGetStaff();
  return (
    <Modal footer={null} visible={isOpen} onCancel={onClose}>
      <Form
        onFinish={(values) => {
          getStaff(values?.serviceCode, {
            onSuccess: (res) => {
              const newData = res?.data;
              if (newData.validation?.length > 0 && !newData?.isActive) {
                message.error("هذا الشيف غير نشط، الرجاء المحاولة مرة اخري");
                return;
              }

              if (+newData?.isActive === 1) {
                dispatch(setCurrentUser(newData));
                dispatch(setIsLogin(true));

                modifiyUserLocalStorage(newData);
                message.success("تم تغيير الشيف بنجاح");
                onClose();
                navigate("/categories");
              }
            },
          });
        }}
        layout="vertical"
        direction="rtl"
      >
        <Form.Item
          label={"كود السيرفز"}
          name="serviceCode"
          rules={[{ required: true }]}
        >
          <InputField type={"number"} />
        </Form.Item>
        <Flex style={{ marginTop: "30px" }} gap="12px">
          <Button type="default" htmlType="button" onClick={onClose} fullwidth>
            إلغاء
          </Button>
          <Button htmlType="submit" isLoading={isLoading} fullwidth>
            تغيير الشيف
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default WaiterShiftChangeModal;
