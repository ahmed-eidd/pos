import { Col, Modal, Row } from 'antd';
import { currencyFormat } from '../services/utils';

function ModalShowCanceldOrder({ open, onCancel, orderItems }) {
  return (
    <Modal
      title="عناصر الطلب الملغي"
      visible={open}
      onCancel={onCancel}
      footer={false}
      width={600}
    >
      {orderItems?.map(item => (
        <div key={item?.id}></div>
      ))}

      <Row gutter={[10, 0]}>
        <Col span={24}>
          <Row gutter={10} justify="space-between" style={{ marginBottom: 10 }}>
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
        {orderItems?.map(el => (
          <Col span={24} key={el?.id}>
            <Row gutter={10} justify="space-between">
              <Col
                span={8}
                style={{ fontSize: 14 }}
              >{`${el?.productName} × ${el?.quantity}`}</Col>
              <Col span={8} style={{ textAlign: 'center', fontSize: 14 }}>
                {currencyFormat(el?.price)}
              </Col>
              <Col
                span={8}
                style={{
                  textAlign: 'end',
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {currencyFormat(el?.quantity * el?.price)}
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </Modal>
  );
}

export default ModalShowCanceldOrder;
