import { css } from '@emotion/css';
import { Button, Descriptions } from 'antd';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import useSheetReport from '../../../api-hooks/useSheetReport';
import { currencyFormat } from '../../../services/utils';

function ShowSheetReportStep({ onClick }) {
  const ShowSheetReportStepStyles = css`
    /* padding-top: 15px; */
    direction: rtl;

    .header {
      margin-bottom: 10px;
      h1 {
        font-weight: 600;
        font-size: 18px;
        text-align: center;
      }
      p {
        font-size: 16px;
        color: #777;
        text-align: center;
      }
    }
    .Descriptions {
      white-space: nowrap;
    }

    .actions {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      gap: 15px;

      button {
        width: 140px;
      }
    }
  `;
  const { sheetReport, sheetReportLod } = useSheetReport();
  console.log('ShowSheetReportStep  sheetReport:', sheetReport);

  const sheetReportRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => sheetReportRef.current,
  });
  return (
    <div className={ShowSheetReportStepStyles}>
      <div className="header">
        <h1>ملخص الشيفت</h1>
        <p>{sheetReport?.shift_date}</p>
      </div>
      <div ref={sheetReportRef}>
        <Descriptions
          bordered
          column={1}
          className="Descriptions"
          style={{ direction: 'rtl', width: '100%' }}
        >
          <Descriptions.Item label="نقطة البيع">
            {sheetReport?.pos_name}
          </Descriptions.Item>
          <Descriptions.Item label="بداية الشيفت">
            {sheetReport?.shift_start}
          </Descriptions.Item>
          <Descriptions.Item label="نهاية الشيفت">
            {sheetReport?.shift_end}
          </Descriptions.Item>
          <Descriptions.Item label="عدد الطلبات">
            {sheetReport?.no_of_orders}
          </Descriptions.Item>
          <Descriptions.Item label="الرصيد الافتتاحي">
            {currencyFormat(sheetReport?.start_balance)}
          </Descriptions.Item>
          <Descriptions.Item label="نقدي">
            {currencyFormat(sheetReport?.cash)}
          </Descriptions.Item>
          <Descriptions.Item label="فيزا">
            {currencyFormat(sheetReport?.visa)}
          </Descriptions.Item>
          <Descriptions.Item label="المستحق">
            {currencyFormat(sheetReport?.end_balance)}
          </Descriptions.Item>
          <Descriptions.Item label="العجز" style={{ color: 'red' }}>
            {currencyFormat(sheetReport?.deficit)}
          </Descriptions.Item>

          <Descriptions.Item label="الرصيد الحالي">
            {currencyFormat(sheetReport?.total)}
          </Descriptions.Item>
        </Descriptions>{' '}
      </div>

      <div className="actions">
        <Button type="primary" size="large" onClick={handlePrint}>
          طباعة
        </Button>
        <Button type="primary" size="large" ghost onClick={onClick}>
          انهاء
        </Button>
      </div>
    </div>
  );
}

export default ShowSheetReportStep;
