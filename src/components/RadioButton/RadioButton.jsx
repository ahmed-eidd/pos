import { Radio } from 'antd';
import classNames from 'classnames';
import React from 'react';
import classes from './RadioButton.module.scss';

const RadioButton = ({ label, value, className, ...props }) => {
  return (
    <Radio.Button
      className={classNames(classes.RadioButton, className)}
      value={value}
      {...props}
    >
      {label}
    </Radio.Button>
  );
};

export default RadioButton;
