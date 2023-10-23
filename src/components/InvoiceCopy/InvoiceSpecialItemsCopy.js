import { css } from '@emotion/css';
import { Col, Row } from 'antd';

function InvoiceSpecialItemsCopy({ invoice, preparationArea, paymentReccived, ...rest }) {
  const InvoiceSpecialItemsCopyStyles = css`
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
      margin-bottom: 0.7rem;

      img {
        max-width: 7rem;
      }
    }
    .basic-info {
      border-bottom: 1px solid #aaa;
    }
  `;

  return (
    <div className={InvoiceSpecialItemsCopyStyles} {...rest}>
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
              <Col>
                <div className="alin-right">taken by: {invoice?.organization_admin}</div>
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
              <Col>
                <div>opening time: {invoice?.opening_time}</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="order-info">
        <h1 className="title">{preparationArea?.label}</h1>
        <Row gutter={[10, 20]}>
          <Col span={24}>
            <div className="order-items-wrapper">
              <Row gutter={[10, 8]}>
                {invoice?.order_items
                  ?.filter(item => item?.preparation_area_id === preparationArea?.value)
                  ?.map(el => (
                    <Col span={24} key={el?.id}>
                      <Row gutter={10} justify="space-between">
                        <Col span={12} style={{ fontSize: 18 }}>
                          {el?.productName}
                        </Col>
                        <Col
                          span={12}
                          style={{
                            textAlign: 'end',
                            fontSize: 18,
                            fontWeight: 600,
                          }}>
                          {el?.quantity}
                        </Col>
                      </Row>
                    </Col>
                  ))}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default InvoiceSpecialItemsCopy;
