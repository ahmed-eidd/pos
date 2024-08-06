import { css } from "@emotion/css";
import { Button, Col, Descriptions, Row, Space, Spin } from "antd";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import useSheetReport from "../../../api-hooks/useSheetReport";
import { currencyFormat } from "../../../services/utils";

function ShowSheetReportStep({ onClick }) {
  const currentUser = useSelector((state) => state.auth.currentUser);
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

  const sheetReportRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => sheetReportRef.current,
  });
  if (sheetReportLod)
    return (
      <Spin
        size="large"
        style={{
          margin: 40,
          display: "flex",
          justifyContent: "center",
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
          style={{ direction: "rtl", width: "100%" }}
        >
          <Descriptions.Item label="نقطة البيع">
            {sheetReport?.pos_name}
          </Descriptions.Item>
          <Descriptions.Item label="اسم الموظف">
            {currentUser?.name}
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
          <Descriptions.Item label="قيمة الطلبات">
            {currencyFormat(sheetReport?.ordersAmount)}
          </Descriptions.Item>
          <Descriptions.Item label="نقدي">
            {currencyFormat(sheetReport?.cash)}
          </Descriptions.Item>
          <Descriptions.Item label="فيزا">
            {currencyFormat(sheetReport?.visa)}
          </Descriptions.Item>
          <Descriptions.Item label="مؤجل">
            {currencyFormat(sheetReport?.deferred)}
          </Descriptions.Item>
          <Descriptions.Item label="فندق">
            {currencyFormat(sheetReport?.hotel)}
          </Descriptions.Item>
          <Descriptions.Item label="الخصم">
            {currencyFormat(sheetReport?.deduction)}
          </Descriptions.Item>
          <Descriptions.Item label="الاصناف المباعه">
            {sheetReport?.categories
              ?.filter((cat) => cat?.items?.length)
              ?.map((cat, i) => (
                <div key={cat?.name + i} className="even-color">
                  <Row gutter={[4, 4]}>
                    <Col span={12}>
                      <h4>{cat?.name}</h4>
                    </Col>
                    <h4>الاجمالي: {currencyFormat(cat?.total)}</h4>
                  </Row>
                  <ul style={{ fontSize: 12 }}>
                    {cat?.items?.map((item, i) => (
                      <li key={item?.name + i}>
                        <Row gutter={[4, 4]}>
                          <Col span={12}>
                            <span>{item?.name}</span>
                          </Col>
                          <Col span={6}>
                            <span>×{item?.quantity}</span>
                          </Col>
                          <Col span={6}>
                            <span>{currencyFormat(item?.amount)}</span>
                          </Col>
                        </Row>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </Descriptions.Item>
          <Descriptions.Item></Descriptions.Item>
        </Descriptions>
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
