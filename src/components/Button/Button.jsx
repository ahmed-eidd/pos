import React from 'react';
import classes from './Button.module.scss';
import { Button as AntButton } from 'antd';
import clx from 'classnames';

const Button = ({ children, className, ...props }) => {
  return (
    <AntButton {...props} className={clx(classes.Button, className)}>
      {children}
    </AntButton>
  );
};

export default Button;
