import React, { useRef } from 'react';
import classes from './OrderPlaced.module.scss';
import SuccessIcon from '../../assets/order-placed/successIcon.png';
import { useCurrentLang } from '../../hooks/useCurrentLang';
import { locale } from '../../locale';
import Button from '../../components/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import InvoiceCopy from '../../components/InvoiceCopy/InvoiceCopy';
import { useReactToPrint } from 'react-to-print';
import { Col, Row } from 'antd';
import { useEffect } from 'react';

const OrderPlaced = () => {
  const [currentLang] = useCurrentLang();
  const orderPlacedLocale = locale.orderPlaced;
  const navigate = useNavigate();
  const { state } = useLocation();
  // console.log('OrderPlaced  state', state);
  const orderRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => orderRef.current,
  });

  const invoice = state?.invoice;
  // console.log('OrderPlaced  invoice', invoice);
  const onNewOrderHandler = () => {
    navigate('/categories');
  };

  console.log({state})
  useEffect(() => {
    handlePrint();
  }, []);

  return (
    <>
      <div className={classes.OrderPlaced}>
        <div className={classes.OrderPlaced__Wrapper}>
          <h3 className={classes.OrderPlaced__Wrapper__Title}>
            {orderPlacedLocale.orderDone[currentLang]}
          </h3>
          <img
            className={classes.OrderPlaced__Wrapper__Icon}
            src={SuccessIcon}
            alt="success"
          />
          <div className={classes.OrderPlaced__Wrapper__TextWrapper}>
            <p>{orderPlacedLocale.orderDone[currentLang]}</p>
            <p>{orderPlacedLocale.orderSuccess[currentLang]}</p>
          </div>
          <Row gutter={20}>
            <Col>
              <Button
                type="primary"
                onClick={onNewOrderHandler}
                className={classes.OrderPlaced__Wrapper__Btn}
              >
                {orderPlacedLocale.newOrder[currentLang]}
              </Button>
            </Col>
            <Col>
              <Button
                type="ghost"
                onClick={handlePrint}
                className={classes.OrderPlaced__Wrapper__Btn}
              >
                {orderPlacedLocale.printInvoice[currentLang]}
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      <div ref={orderRef}>
        <InvoiceCopy
          invoice={invoice}
          paymentReccived
          isGroupOrderItem={true}
        />
      </div>
    </>
  );
};

export default OrderPlaced;
