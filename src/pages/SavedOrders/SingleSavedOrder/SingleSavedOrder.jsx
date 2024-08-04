import { SwapOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Button,
  Descriptions,
  Input,
  message,
  Popconfirm,
  Select,
  Space,
  Table,
  Typography,
} from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import useCancelOrder from '../../../api-hooks/useCancelOrder';
import InvoiceCopy from '../../../components/InvoiceCopy/InvoiceCopy';
import InvoiceSpecialItemsCopy from '../../../components/InvoiceCopy/InvoiceSpecialItemsCopy';
import ModalSelectTable from '../../../components/ModalSelectTable';
import { currencyFormat } from '../../../services/utils';
import {
  setCartToShowSavedOrder,
  setCurrentSavedOrderIdAction,
} from '../../../store/cartSlice';
import { usePrintItem } from '../../../hooks/query/usePrint';
import { useCurrentLoginType } from '../../../hooks/useCurrentLoginType';
import Flex from '../../../components/Flex/Flex';

const SingleSavedOrderStyles = css`
  border-radius: 4px;
  direction: rtl;
  &:not(:first-child) {
    padding-top: 20px;
    border-top: 1px solid #ddd;
  }

  .ant-descriptions-item-label {
    white-space: nowrap;
  }
  .ant-descriptions-item-content {
    white-space: nowrap;
    font-size: 12px;
    font-weight: 600;
    &.big {
      font-size: 16px;
    }
  }
`;
const OrderTableStyles = css`
border-radius: 4px;
  margin-top: 20px;
border: 1px solid #ddd;
  width: 100%;
padding: 20px 10px;
  .ant-table-wrapper {
    width: 100%;
    height: 300px;
    overflow-y: scroll;
    scrollbar-color: #006AFF #ffffff;
    scrollbar-width: thin;
    direction: rtl;
  }
  .ant-table-wrapper::-webkit-scrollbar {
    width: 1px;
  }

  .ant-table-wrapper::-webkit-scrollbar-thumb {
    background-color: #333;
    border-radius: 0px;
  }
`;
const SingleSavedOrder = ({ order, setCancelOrderItems, closeModal }) => {
  console.log({ order });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cancelOrder, cancelOrderLod } = useCancelOrder();
  const [isSelectTableModal, setIsSelectTableModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [password, setPassword] = useState('');
  const [selectedPreparationArea, setSelectedPreparationArea] = useState(null); // this gets deleted after printing
  const [selectedPrepAreaForMemo, setSelectedPrepAreaForMemo] = useState(null); // this does not get deleted after printing (used for useMemo)
  const [submittingItemToPrintLoading, setSubmittingItemToPrintLoading] =
    useState(false);

  const { isCashier } = useCurrentLoginType();
  const sumbitItemToPrint = usePrintItem();
  const currentSelectedItemsIds = useMemo(() => {
    return order?.order_items
      ?.filter((el) => {
        return el?.preparation_area_id === selectedPrepAreaForMemo?.value;
      })
      .map((el) => el?.id);
  }, [selectedPrepAreaForMemo, order]);

  const handleSumbitItemToPrint = (item, onSuccess, onError) => {
    console.log({ item }, 'getting new');
    const currentSelectItemIds =
      item === 'all'
        ? order?.order_items?.map((el) => el?.id)
        : order?.order_items
            ?.filter((el) => {
              return el?.preparation_area_id === item?.value;
            })
            .map((el) => el?.id);
    // if (currentSelectedItemsIds?.length > 0) return;
    console.log(
      { currentSelectItemIds, selectedPreparationArea },
      'setting new',
    );
    return sumbitItemToPrint.mutate(currentSelectItemIds, {
      onSuccess: (res) => {
        onSuccess && onSuccess(res);
      },
      onError: (err) => {
        onError && onError(err);
      },
    });
  };

  console.log(
    { order: order, selectedPreparationArea, currentSelectedItemsIds },
    'currentSelectedSingleOrderData',
  );

  const preparationAreaList = order?.order_items?.reduce((a, c) => {
    const preparationArea = c?.preparation_area?.[0];
    let isCurrent = false;
    a.forEach((el) => {
      if (el?.value === preparationArea?.id) isCurrent = true;
    });

    if (!isCurrent)
      a.push({ value: preparationArea?.id, label: preparationArea?.name });
    return a;
  }, []);

  const handleCancelOrder = () => {
    if (!password) return message.warning('الرجاء إدخال كلمة مرور');

    const fd = new FormData();
    fd.append('order_id', order?.id);
    fd.append('password', password);

    cancelOrder({
      fd,
      onSuc: (res) => {
        setCancelOrderItems(res?.data?.order_items);
        handleCloseModal();
      },
    });
    setPassword('');
  };

  const orderRef = useRef(null);
  const spceficItemsRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => orderRef.current,
  });
  const handlePrintSpceficItems = useReactToPrint({
    content: () => spceficItemsRef.current,
    onBeforeGetContent: () => {},
    // onAfterPrint: setSelectedPreparationArea(null),
  });

  const handleCloseModal = () => {
    if (closeModal) closeModal();
  };

  useEffect(() => {
    if (selectedPreparationArea) handlePrintSpceficItems();

    return () => {
      setSelectedPreparationArea(null);
    };
  }, [selectedPreparationArea, handlePrintSpceficItems]);

  return (
    <>
      <div className={SingleSavedOrderStyles}>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="رقم الطلب" className="big">
            {order?.id}
          </Descriptions.Item>
          <Descriptions.Item label="رقم الطاوله" className="big">
            {String(order?.table_number)}
            <Button
              type="link"
              icon={<SwapOutlined />}
              onClick={() => setIsSelectTableModal(true)}
            />
          </Descriptions.Item>
          <Descriptions.Item label="الوقت">
            {order?.opening_time}
          </Descriptions.Item>
          <Descriptions.Item label="التاريخ">
            {order?.created_at}
          </Descriptions.Item>
          <Descriptions.Item label="الاجمالي" className="big">
            {currencyFormat(order?.total_amount)} LE
          </Descriptions.Item>
        </Descriptions>
        <Space
          style={{ marginTop: 10, width: '100%', justifyContent: 'center' }}
        >
          {isCashier && (
            <Button
              type="primary"
              size="large"
              style={{ minWidth: 'auto' }}
              onClick={() => {
                dispatch(setCartToShowSavedOrder(true));
                dispatch(setCurrentSavedOrderIdAction(order?.id));
                handleCloseModal();
                navigate('/checkout', {
                  state: {
                    checkoutOrder: {
                      id: order?.id,
                      tableNumber: order?.table_number,
                    },
                  },
                });
              }}
            >
              ادفع
            </Button>
          )}
          <Button
            type="primary"
            size="large"
            style={{ minWidth: 'auto' }}
            ghost
            onClick={() => {
              dispatch(setCartToShowSavedOrder(true));
              dispatch(setCurrentSavedOrderIdAction(order?.id));
              handleCloseModal();
            }}
          >
            وضع الطلب للتعديل
          </Button>
          <Button
            type="primary"
            size="large"
            style={{ minWidth: 'auto' }}
            onClick={() => {
              handleSumbitItemToPrint(
                'all',
                () => {
                  handlePrint();
                  handleCloseModal();
                },
                () => {
                  message.error('حدث خطأ أثناء الطباعة');
                },
              );
            }}
            loading={sumbitItemToPrint.isLoading}
          >
            اطبع
          </Button>
          <Select
            style={{ width: 120 }}
            placeholder="مكان التحضير"
            options={preparationAreaList}
            onSelect={(_, item) => {
              console.log({ item }, 'new');
              handleSumbitItemToPrint(
                item,
                () => {
                  setSelectedPreparationArea(item);
                },
                () => {
                  message.error('حدث خطأ أثناء الطباعة');
                },
              );
              setSelectedPrepAreaForMemo(item);
            }}
          />
          {isCashier && (
            <Popconfirm
              title={
                <div>
                  <h4 style={{ marginBottom: 4 }}>هل تريد حذف الطلب؟</h4>
                  <Input.Password
                    value={password}
                    onChange={({ target }) => setPassword(target?.value)}
                    placeholder="أدخل كلمة المرور"
                  />
                </div>
              }
              okText="نعم"
              cancelText="لا"
              onConfirm={handleCancelOrder}
            >
              <Button
                type="primary"
                size="large"
                danger
                style={{ minWidth: 'auto' }}
                loading={cancelOrderLod}
              >
                الغاء
              </Button>
            </Popconfirm>
          )}
        </Space>
      </div>
      {/* <div style={{ position: 'fixed', zIndex: -9 }}> */}
      <div style={{ position: 'fixed', zIndex: -9, visibility: 'hidden' }}>
        <div ref={orderRef}>
          <InvoiceCopy invoice={order} isGroupOrderItem={true} />
        </div>
      </div>
      <div style={{ position: 'fixed', zIndex: -9, visibility: 'hidden' }}>
        <div ref={spceficItemsRef}>
          <InvoiceSpecialItemsCopy
            invoice={order}
            preparationArea={selectedPreparationArea}
          />
        </div>
      </div>
      <Flex
        direction="column"
        justify="space-between"
        align="flex-end"
        gap={10}
        className={OrderTableStyles}
      >
        <Typography.Title level={4}>المنتجات</Typography.Title>
        <Table
          bordered
          dataSource={order?.order_items}
          key={order?.id}
          columns={[
            {
              title: 'المنتج',
              dataIndex: 'productName',
              key: 'name',
            },
            {
              title: 'الكمية',
              dataIndex: 'quantity',
              key: 'quantity',
            },
            {
              title: 'السعر',
              dataIndex: 'price',
              key: 'price',
              render: (price) => <p>{price} ج.م</p>,
            },
          ]}
          pagination={false}
        />
      </Flex>
      <ModalSelectTable
        open={isSelectTableModal}
        onCancel={() => setIsSelectTableModal(false)}
        orderId={order?.id}
        selectedTable={selectedTable}
        setSelectedTable={setSelectedTable}
      />
    </>
  );
};

export default SingleSavedOrder;
