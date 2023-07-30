import { css } from '@emotion/css';
import { Button, Descriptions, Space, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import useSheetReport from '../../../api-hooks/useSheetReport';
import { currencyFormat, isObject } from '../../../services/utils';

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
  const [categorylist, setCategorylist] = useState([]);
  console.log('ShowSheetReportStep  categorylist:', categorylist);
  console.log('ShowSheetReportStep  sheetReport:', sheetReport);

  const sheetReportRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => sheetReportRef.current,
  });

  useEffect(() => {
    if (!sheetReport?.categories) return;
    // const categories = Object.keys(sheetReport?.categories)?.filter(key => {
    //   if (!!sheetReport?.categories?.[key])
    //     return sheetReport?.categories?.[key];
    //   return false;
    // });
    const categoryKeys = Object.keys(sheetReport?.categories)?.filter(key =>
      isObject(sheetReport?.categories?.[key])
    );
    const categoryList = categoryKeys.map((key, i) => ({
      name: key,
      id: key + i,
      children: Object.entries(sheetReport?.categories?.[key])?.map(
        ([name, value], i) => ({
          id: name + i,
          name,
          ...value,
        })
      ),
    }));
    // console.log('categories  categoryKeys:', categoryKeys);
    setCategorylist(categoryList);
  }, [sheetReport?.categories]);
  if (sheetReportLod)
    return (
      <Spin
        size="large"
        style={{
          margin: 40,
          display: 'flex',
          justifyContent: 'center',
        }}
      />
    );
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
          <Descriptions.Item label="الاصناف المباعه">
            {categorylist?.map(cat => (
              <div key={cat?.id}>
                <h4>{cat?.name}</h4>
                <ul style={{ fontSize: 12 }}>
                  {cat?.children?.map(item => (
                    <li key={item?.id}>
                      <Space size="large">
                        <span>{item?.name}</span>
                        <span>×{item?.quantity}</span>
                        <span>{currencyFormat(item?.amount)}</span>
                      </Space>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
