import { css } from '@emotion/css';
import { Col, Row } from 'antd';
import { currencyFormat } from '../../services/utils';
import logo from '../../assets/pos-logo.jpg';

function InvoiceCopy({ invoice, ...rest }) {
  console.log('InvoiceCopy  invoice', invoice);
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

    font-size: 1.1rem;
    text-transform: capitalize;
    line-height: 1.4;
    color: #000;

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
      margin-bottom: 1rem;

      img {
        width: 7rem;
      }
    }
    .basic-info {
      padding-bottom: 1rem;
      border-bottom: 1px solid #aaa;
    }
  `;

  return (
    <div className={InvoiceCopyStyles} {...rest}>
      <div className="float">copy</div>
      <div className="title">
        <img src={logo} alt="POS" />
        <span>نادي التجديف الرئيسي</span>
      </div>
      <div className="basic-info">
        <Row gutter={[10, 0]}>
          <Col span={24}>
            <div>outlet: {invoice?.point_of_sale}</div>
          </Col>
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
                {invoice?.order_items?.map(el => (
                  <Col span={24}>
                    <Row justify="space-between">
                      <Col>{el?.productName}</Col>
                      <Col>{currencyFormat(el?.price)}</Col>
                    </Row>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
          <Col span={24}>
            <Row gutter={[10, 0]}>
              <Col span={24}>
                <Row justify="space-between">
                  <Col>
                    <div>total</div>
                  </Col>
                  <Col>
                    <div>{currencyFormat(invoice?.total_amount)}</div>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row justify="space-between">
                  <Col>
                    <div>cash</div>
                  </Col>
                  <Col>
                    <div>{invoice?.order_payment}</div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <div>payment recived, thank you.</div>
          </Col>
        </Row>
      </div>
      <div style={{ marginTop: 20 }}>closing time: {invoice?.closing_time}</div>
    </div>
  );
}

export default InvoiceCopy;
