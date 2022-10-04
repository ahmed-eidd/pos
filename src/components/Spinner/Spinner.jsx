import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

const Spinner = ({ spinning, size = 24, ...props }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: size }} spin />;
  return <Spin spinning={spinning} indicator={antIcon} {...props} />;
};

export default Spinner;
