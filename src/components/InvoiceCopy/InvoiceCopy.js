import { css } from '@emotion/css';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { useCurrentLoginType } from '../../hooks/useCurrentLoginType';
import { currencyFormat } from '../../services/utils';
import Flex from '../Flex/Flex';
import posPlaceholder from '../../assets/pos-order-logo.jpeg';
import { useMemo, useState } from 'react';
// import logo from '../../assets/pos-logo.jpeg';

function InvoiceCopy({
  invoice,
  paymentReccived,
  isGroupOrderItem = false,
  ...rest
}) {
  console.log({ invoice });
  const InvoiceCopyStyles = css`
    width: 30rem;
    max-width: 100%;
    margin: auto;
    position: relative;
    padding: 3rem 1.5rem 2rem;
    /* border: 1px solid #777;› */
    background-color: #fff;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    font-size: 12px;
    text-transform: capitalize;
    line-height: 1.4;
    color: rgba(0, 0, 0, 0.95);

    .float {
      position: absolute;
      top: 2rem;
      right: 2rem;
      color: #444;
    }

    .alin-right {
      text-align: end;
    }
    .title {
      font-weight: 600;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      margin-bottom: 0.5rem;

      img {
        max-width: 7rem;
      }
    }
    .basic-info {
      padding-bottom: 1rem;
      border-bottom: 1px solid #aaa;
    }
  `;

  const currentUser = useSelector((s) => s?.auth?.currentUser);
  const [logoImgError, setLogoImgError] = useState(false);
  const orderItems = useMemo(() => {
    console.log({ invoice });
    const items = invoice?.order_items;
    if (!isGroupOrderItem || items?.length <= 1 || !items) return items;

    const foundItems = {};

    for (let i of items) {
      const itemId = i?.itemId;
      const quantity = parseFloat(i?.quantity) || 0;

      if (itemId) {
        if (foundItems[itemId]) {
          foundItems[itemId].quantity += quantity;
        } else {
          foundItems[itemId] = { ...i, quantity }; // Create a copy of the item
        }

      }
    }
    return Object.values(foundItems);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice?.order_items, isGroupOrderItem]);

  const isWaiterNameAvailable = invoice?.staff && invoice?.staff !== '-';
  return (
    <div className={InvoiceCopyStyles} {...rest}>
      <div className="float">copy</div>
      <div className="title">
        {!!currentUser?.logo && !logoImgError ? (
          <img
            onError={() => setLogoImgError(true)}
            src={currentUser?.logo}
            alt="POS"
          />
        ) : (
          <img src={posPlaceholder} alt="POS" />
        )}

        <div>Pos Serials number: {invoice?.pos_serial || '-'}</div>
      </div>
      <div className="basic-info">
        <Row gutter={[10, 0]} align="end">
          <Col span={isWaiterNameAvailable ? 12 : 24}>
            <Flex justify="start">outlet: {invoice?.point_of_sale}</Flex>
          </Col>

          {isWaiterNameAvailable && (
            <Col span={12}>
              <Flex justify="end">staff name: {invoice?.staff}</Flex>
            </Col>
          )}
          <Col span={24}>
            <Row gutter={20} justify="space-between">
              <Col>
                <div>table: {invoice?.table_number}</div>
              </Col>
              <Col>
                <div>date: {invoice?.created_at}</div>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={20} justify="space-between">
              {/* <Col>
                <div>guests: 1</div>
              </Col> */}
              <Col>
                <div className="alin-right">
                  taken by: {invoice?.organization_admin}
                </div>
              </Col>
              <Col>
                <div>shift: {invoice?.shift}</div>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={20} justify="space-between">
              <Col>
                <div>order type: {invoice?.type}</div>
              </Col>
              <Col>
                <div>serial: #{invoice?.id}</div>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={20} justify="space-between">
              <Col>
                <div>Serials number: {invoice?.multi_serials || '-'}</div>
              </Col>
            </Row>
          </Col>
          {/* <Col span={24}>
            <div className="alin-right">
              taken by: {invoice?.organization_admin}
            </div>
          </Col> */}
        </Row>
      </div>
      <div className="order-info">
        <Row gutter={[10, 20]}>
          <Col span={24}>
            <div>opening time: {invoice?.opening_time}</div>
          </Col>
          <Col span={24}>
            <div className="order-items-wrapper">
              <Row gutter={[10, 0]}>
                <Col span={24}>
                  <Row gutter={10} justify="space-between">
                    <Col
                      span={4}
                      style={{ fontSize: 14, border: '1px solid black' }}
                    >
                      الكمية
                    </Col>
                    <Col
                      span={8}
                      style={{ fontSize: 14, border: '1px solid black' }}
                    >
                      المنتج
                    </Col>
                    <Col
                      span={6}
                      style={{
                        fontSize: 14,
                        textAlign: 'center',
                        border: '1px solid black',
                      }}
                    >
                      السعر
                    </Col>
                    <Col
                      span={6}
                      style={{
                        fontSize: 14,
                        textAlign: 'end',
                        border: '1px solid black',
                      }}
                    >
                      الاجمالي
                    </Col>
                  </Row>
                </Col>
                {orderItems?.map((el) => (
                  <Col span={24} key={el?.id}>
                    <Row gutter={10} justify="space-between">
                      <Col
                        span={4}
                        style={{ fontSize: 14, border: '1px solid black' }}
                      >
                        {`${el?.quantity}`}
                      </Col>
                      <Col
                        span={8}
                        style={{ fontSize: 14, border: '1px solid black' }}
                      >
                        {`${el?.productName}`}
                      </Col>

                      <Col
                        span={6}
                        style={{
                          textAlign: 'center',
                          fontSize: 14,
                          border: '1px solid black',
                        }}
                      >
                        {currencyFormat(el?.price)}
                      </Col>
                      <Col
                        span={6}
                        style={{
                          textAlign: 'end',
                          fontSize: 14,
                          fontWeight: 600,
                          border: '1px solid black',
                        }}
                      >
                        {currencyFormat(el?.quantity * el?.price)}
                      </Col>
                    </Row>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
          <Col span={24}>
            <Row gutter={[10, 0]}>
              <Col span={24}>
                {!!invoice?.discount && (
                  <Row justify="space-between">
                    <Col>
                      <div>
                        {invoice?.discount_type === 'percentage' &&
                        +invoice?.discount === 100
                          ? 'ضيافة'
                          : 'Discount'}
                      </div>
                    </Col>
                    <Col>
                      <div style={{ fontWeight: 600 }}>
                        {invoice?.discount_type === 'percentage'
                          ? invoice?.discount + '%'
                          : currencyFormat(invoice?.discount)}
                      </div>
                    </Col>
                  </Row>
                )}
                <Row justify="space-between">
                  <Col>
                    <div style={{ fontWeight: '700', fontSize: '16px' }}>
                      {invoice?.discount_type === 'percentage' &&
                      +invoice?.discount === 100
                        ? 'ضيافة'
                        : 'total'}
                    </div>
                  </Col>
                  <Col>
                    <div style={{ fontWeight: 700 }}>
                      {currencyFormat(invoice?.total_amount)}
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row justify="space-between" style={{ marginTop: 10 }}>
                  <Col>
                    <div style={{ fontWeight: 700, fontSize: '16px' }}>
                      cash
                    </div>
                  </Col>
                  <Col>
                    <div style={{ fontWeight: 700, fontSize: '16px' }}>
                      {invoice?.order_payment === 'credit'
                        ? 'مؤجل'
                        : invoice?.order_payment}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          {paymentReccived && (
            <Col span={24}>closing time: {invoice?.closing_time}</Col>
          )}
          {
            <Col span={24}>
              <div>
                {paymentReccived ? (
                  <>
                    <p>Payment recived, thank you.</p>
                    <p>
                      Having you at our place was a real pleasure and we hope to
                      see you again soon 😉
                    </p>
                  </>
                ) : (
                  'Payment not recevied'
                )}
              </div>
            </Col>
          }
          {/* <Col span={24}>
            <div>payment recived, thank you.</div>
          </Col> */}
        </Row>
      </div>
      {/* <div style={{ marginTop: 0 }}>closing time: {invoice?.closing_time}</div> */}
    </div>
  );
}

export default InvoiceCopy;
