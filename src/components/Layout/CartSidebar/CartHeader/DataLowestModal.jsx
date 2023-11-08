import { Modal, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useGetDataLowest } from '../../../../api-hooks/useDataLowest';

const DataLowestModal = ({ open, setOpen }) => {
  const { data, refetch, isFetching } = useGetDataLowest();
  console.log(data);

  useEffect(() => {
    if (open) {
      refetch();
    }
  }, [refetch, open]);
  return (
    <Modal
      visible={open}
      footer={null}
      onCancel={() => setOpen(false)}
      destroyOnClose
    >
      <Spin spinning={isFetching}>لاتوجد بيانات للعرض</Spin>
    </Modal>
  );
};

export default DataLowestModal;
