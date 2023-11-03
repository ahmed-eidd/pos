import { ArrowLeftOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Badge,
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Spin,
} from 'antd';
import { Link, useParams } from 'react-router-dom';
import useApi from '../api-hooks/useApi';
import useOrderDetails from '../api-hooks/useOrderDetails';
import { queryKeys } from '../constants/queryKeys';
import { useGetOrders } from '../hooks/query/useOrders';
import { currencyFormat } from '../services/utils';

function CanceledOrderDetails() {
  const CanceledOrderDetailsStyles = css`
    min-height: 75vh;
    direction: rtl;
    .status {
      font-weight: 500;
      font-size: 16px;
      margin-bottom: 0.5rem;
    }

    .basic-info {
      padding: 10px;
      background-color: #eee;
      border-radius: 10px;
    }
    .item-wrapper {
      /* background-color: #eee; */

      .actions-wrapper {
        /* background-color: red; */
        display: flex;
        justify-content: flex-end;
      }
    }

    .ant-spin-nested-loading {
      display: block;
      width: 100%;
    }
  `;

  const api = useApi();
  const httpFunc = async (fd) => {
    const res = await api.post('changeItemsStatusForCancel', fd);
    return res;
  };

  const { id } = useParams();
  const client = useQueryClient();

  const { mutate: onChangeItemStatus, isLoading: onChangeItemStatusLod } =
    useMutation(httpFunc, {
      onSuccess: (res) => {
        console.log('CanceledOrderDetails  res:', res);
        if (res?.code === 200) {
          message.success(res?.message);
        }
        client.invalidateQueries([queryKeys.orderDetails, id]);
      },
    });

  const { orderDetail, orderDetailLod } = useOrderDetails(id);
  console.log('CanceledOrderDetails  orderDetail:', orderDetail);
  // const { data, isLoading } = useGetOrders(null, id);
  // // const { data, isLoading } = useGetOrders(null, id, null, true);
  // console.log('CanceledOrderDetails  data:', data);
  // const orderData = data?.orders || [];

  // const currentOrderData = orderData[0];
  // console.log('CanceledOrderDetails  currentOrderData:', currentOrderData);

  const onFinish = (values) => {
    const fd = new FormData();
    fd.append('item_id', values?.item_id);
    fd.append('status', values?.status);
    fd.append('order_id', id);

    onChangeItemStatus(fd);
  };

  return (
    <div className={CanceledOrderDetailsStyles}>
      <div className='basic-info'>
        <Row gutter={[10, 0]}>
          <Col span={24}>
            <Row gutter={20} justify='space-between'>
              <Col>
                <div>outlet: {orderDetail?.point_of_sale}</div>
              </Col>
              <Col>
                <Link to='/canceled-order'>
                  <Button type='link' ghost style={{ padding: 0 }}>
                    <Space>
                      رجوع
                      <ArrowLeftOutlined />
                    </Space>
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={20} justify='space-between'>
              <Col>
                <div>table: {orderDetail?.table_number}</div>
              </Col>
              <Col>
                <div>date: {orderDetail?.created_at}</div>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={20} justify='space-between'>
              <Col>
                <div className='alin-right'>
                  taken by: {orderDetail?.organization_admin}
                </div>
              </Col>
              <Col>
                <div>shift: {orderDetail?.shift}</div>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={20} justify='space-between'>
              <Col>
                <div>order type: {orderDetail?.type}</div>
              </Col>
              <Col>
                <div>serial: #{orderDetail?.id}</div>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={20} justify='space-between'>
              <Col>
                <div>Serials number: {orderDetail?.multi_serials || '-'}</div>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={20} justify='space-between'>
              <Col>
                <div>Pos Serials number: {orderDetail?.pos_serial || '-'}</div>
              </Col>
            </Row>
          </Col>
          {/* <Col span={24}>
            <div className="alin-right">
              taken by: {orderDetail?.organization_admin}
            </div>
          </Col> */}
        </Row>
      </div>{' '}
      <div className='order-items-wrapper'>
        <Divider>عناصر الطلب</Divider>
        <Row>
          <Col span={12}>
            <Row
              gutter={10}
              justify='space-between'
              style={{ marginBottom: 10 }}
            >
              <Col span={8} style={{ fontSize: 14, fontWeight: 600 }}>
                الكمية × اسم العنصر
              </Col>
              <Col
                span={8}
                style={{ textAlign: 'center', fontSize: 14, fontWeight: 600 }}
              >
                السعر
              </Col>
              <Col
                span={8}
                style={{
                  textAlign: 'end',
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                الاجمالي
              </Col>
            </Row>
          </Col>
          <Col span={12}></Col>
          <Spin spinning={orderDetailLod}>
            {orderDetail?.order_items?.map((item) => (
              <Col key={item?.id} span={24} className='item-wrapper'>
                <Row>
                  <Col span={12} key={item?.id}>
                    <Row gutter={10} justify='space-between'>
                      <Col
                        span={8}
                        style={{ fontSize: 14 }}
                      >{`${item?.productName} × ${item?.quantity}`}</Col>
                      <Col
                        span={8}
                        style={{ textAlign: 'center', fontSize: 14 }}
                      >
                        {currencyFormat(item?.price)}
                      </Col>
                      <Col
                        span={8}
                        style={{
                          textAlign: 'end',
                          fontSize: 14,
                          fontWeight: 600,
                        }}
                      >
                        {currencyFormat(item?.quantity * item?.price)}
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <div className='actions-wrapper'>
                      {item?.status_for_cancel === 0 ? (
                        <Form onFinish={onFinish}>
                          {/* <Form.Item name="item_id" hidden initialValue={item?.itemId}> */}
                          <Form.Item
                            name='item_id'
                            hidden
                            initialValue={item?.id}
                          >
                            <Input />
                          </Form.Item>
                          <Space>
                            <Form.Item
                              name='status'
                              rules={[{ required: true }]}
                            >
                              <Select
                                style={{ width: 180 }}
                                placeholder='حدد حالة العنصر'
                                options={[
                                  { value: 1, label: 'سحب من المخزون' },
                                  { value: 2, label: 'اعادة الى المخزون' },
                                ]}
                              />
                            </Form.Item>
                            <Form.Item>
                              <Button
                                htmlType='submit'
                                type='primary'
                                disabled={onChangeItemStatusLod}
                              >
                                تم
                              </Button>
                            </Form.Item>
                          </Space>
                        </Form>
                      ) : item?.status_for_cancel === 1 ? (
                        <p className='status'>سحب من المخزون</p>
                      ) : (
                        <div className='status'>اعادة الى المخزون</div>
                      )}
                    </div>
                  </Col>
                </Row>
              </Col>
            ))}
          </Spin>
        </Row>
      </div>
    </div>
  );
}

export default CanceledOrderDetails;

// <Row gutter={[10, 0]}>
//         <Col span={24}>
//           <Row gutter={10} justify="space-between" style={{ marginBottom: 10 }}>
//             <Col span={8} style={{ fontSize: 14, fontWeight: 600 }}>
//               الكمية × اسم العنصر
//             </Col>
//             <Col
//               span={8}
//               style={{ textAlign: 'center', fontSize: 14, fontWeight: 600 }}
//             >
//               السعر
//             </Col>
//             <Col
//               span={8}
//               style={{
//                 textAlign: 'end',
//                 fontSize: 14,
//                 fontWeight: 600,
//               }}
//             >
//               الاجمالي
//             </Col>
//           </Row>
//         </Col>
//         {orderItems?.map(el => (
//           <Col span={24} key={el?.id}>
//             <Row gutter={10} justify="space-between">
//               <Col
//                 span={8}
//                 style={{ fontSize: 14 }}
//               >{`${el?.productName} × ${el?.quantity}`}</Col>
//               <Col span={8} style={{ textAlign: 'center', fontSize: 14 }}>
//                 {currencyFormat(el?.price)}
//               </Col>
//               <Col
//                 span={8}
//                 style={{
//                   textAlign: 'end',
//                   fontSize: 14,
//                   fontWeight: 600,
//                 }}
//               >
//                 {currencyFormat(el?.quantity * el?.price)}
//               </Col>
//             </Row>
//           </Col>
//         ))}
//       </Row>
