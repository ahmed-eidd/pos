import { Modal, Spin, Table } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useGetDataLowest } from '../../../../api-hooks/useDataLowest';
import './DataLowestModal.scss';

const DataLowestModal = ({ open, setOpen }) => {
  const [currnetPage, setCurrentPage] = useState(1);
  const { data, refetch, isFetching } = useGetDataLowest({
    page: currnetPage,
    open,
  });
  const dataFormated = useMemo(() => {
    const items = data?.data?.map((item) => ({
      ...item?.ingredient,
      name: item?.ingredient?.name?.ar,
    }));
    return items;
  }, [data]);

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
      width={800}
    >
      <Spin spinning={isFetching}>
        <Table
          pagination={{
            total: data?.total,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
            },
          }}
          columns={[
            {
              title: 'الاسم',
              dataIndex: 'name',
            },
            {
              title: 'التكلفة',
              dataIndex: 'cost',
            },
            {
              title: 'السعر',
              dataIndex: 'price',
            },
            {
              title: 'الكمية',
              dataIndex: 'stock',
            },
            {
              title: 'اخر سعر للبيع',
              dataIndex: 'last_selling_price',
            },
          ]}
          dataSource={dataFormated}
        ></Table>
      </Spin>
    </Modal>
  );
};

export default DataLowestModal;
