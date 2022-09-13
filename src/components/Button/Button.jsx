import React from 'react';
import classes from './Button.module.scss';
import { Button as AntButton } from 'antd';
import clx from 'classnames';

const Button = ({
  children,
  htmlType = 'submit',
  className = '',
  fullwidth = false,
  halfwidth = false,
  type = 'primary',
  large = true,
  onClick,
  ...props
}) => {
  return (
    <AntButton
      style={{ width: fullwidth ? '100%' : halfwidth ? '50%' : 'auto' }}
      {...props}
      className={clx(classes.Button, className, {
        [classes['lg']]: large,
      })}
      type={type}
      htmlType={htmlType}
      onClick={onClick}
    >
      {children}
    </AntButton>
  );
};

export default Button;
