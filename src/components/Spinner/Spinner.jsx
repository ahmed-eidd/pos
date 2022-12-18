import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

const Spinner = ({
  spinning = true,
  fullWidth,
  size = 24,
  spinnerStyle,
  ...props
}) => {
  const antIcon = <LoadingOutlined style={{ fontSize: size }} spin />;
  return (
    <Spin
      spinning={spinning}
      indicator={antIcon}
      style={{ display: fullWidth ? 'block' : 'inline-block', ...spinnerStyle }}
      {...props}
    />
  );
};

export default Spinner;
