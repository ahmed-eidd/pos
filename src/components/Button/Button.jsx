import React from 'react';
import classes from './Button.module.scss';
import { Button as AntButton } from 'antd';
import clx from 'classnames';

const Button = ({
  children,
  htmlType = 'submit',
  className,
  fullwidth,
  type,
  ...props
}) => {
  return (
    <AntButton
      style={{ width: fullwidth ? '100%' : 'auto' }}
      {...props}
      className={clx(classes.Button, className)}
      type={type}
      htmlType={htmlType}
    >
      {children}
    </AntButton>
  );
};

export default Button;
