import React, { forwardRef } from 'react';
import { useZusStore } from '../../store/useStore';

const OrderToPrint = forwardRef((props, ref) => {
  const printedOrder = useZusStore((state) => state.order.printedOrder);
  return (
    <div
      ref={ref}
      style={{
        padding: '2rem',
        fontSize: '3rem',
      }}
    >
      {printedOrder?.items?.map((order) => {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <p>{order?.quantity}</p>
            <p>{order?.productName}</p>
          </div>
        );
      })}
      <p>{printedOrder?.total}</p>
    </div>
  );
});

export default OrderToPrint;
