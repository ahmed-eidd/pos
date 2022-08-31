import { Collapse } from 'antd';
import React from 'react';
import classes from './ItemAccordion.module.scss';
import ArrowIcon from '../../assets/chevron-right.png';
import CounterBtns from '../../CounterBtns/CounterBtns';
import TrashIcon from '../../assets/trash.png';

const { Panel } = Collapse;

const Header = ({ text, count }) => {
  return (
    <div className={classes.ItemAccordion__Header}>
      <p className={classes.ItemAccordion__Header__Count}>{count}</p>
      <p className={classes.ItemAccordion__Header__Text}>{text}</p>
    </div>
  );
};

const ItemAccordion = ({ items = [] }) => {
  return (
    <Collapse
      expandIconPosition='end'
      expandIcon={({ isActive }) => (
        <div>
          <img
            style={{
              transform: isActive ? 'rotate(90deg)' : 'rotate(0)',
              transition: 'transform .2s ease-in-out',
            }}
            src={ArrowIcon}
            alt='arrow'
          />
        </div>
      )}
      bordered={false}
      className={classes.ItemAccordion}
    >
      {items.length > 0 ? (
        items.map((item) => {
          return (
            <Panel
              key={item.id}
              header={<Header text={item.text} count={item.count} />}
            >
              <div className={classes.ItemAccordion__Panel}>
                <div className={classes.ItemAccordion__Panel__CounterWrapper}>
                  <CounterBtns count={item.count} />
                  <p
                    className={
                      classes.ItemAccordion__Panel__CounterWrapper__Count
                    }
                  >
                    {`${item.count}x160EGP`}
                  </p>
                </div>
                <img
                  className={
                    classes.ItemAccordion__Panel__CounterWrapper__Delete
                  }
                  src={TrashIcon}
                  alt='delete'
                />
              </div>
            </Panel>
          );
        })
      ) : (
        <h1>No Data</h1>
      )}
    </Collapse>
  );
};

export default ItemAccordion;
