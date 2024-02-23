import { message, Modal, Spin } from "antd";
import React from "react";
import useTableChange from "../api-hooks/useTableChange";
import SelectTable from "../pages/Checkout/SelectTable";

function ModalSelectTable({
  open,
  onSumbit,
  onCancel,
  orderId,
  selectedTable,
  setSelectedTable,
}) {
  const { tableChange, tableChangeLod } = useTableChange();

  const onOk = () => {
    if (onSumbit) {
      onSumbit();
      return;
    }
    if (!selectedTable) return message.warning("حدد الطاوله أولاً");
    const fd = new FormData();
    fd.append("order_id", orderId);
    fd.append("to_table_id", selectedTable?.tableId);
    tableChange({
      data: fd,
      onSuc: () => {
        setSelectedTable(null);
        onCancel();
      },
    });
  };
  return (
    <Modal visible={open} onCancel={onCancel} width={800} onOk={onOk}>
      <Spin spinning={tableChangeLod}>
        <SelectTable
          selectedTable={selectedTable}
          setSelectedTable={setSelectedTable}
        />
      </Spin>
    </Modal>
  );
}

export default ModalSelectTable;
