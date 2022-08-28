import React from 'react';
import { Layout as AntLayout } from 'antd';
import Sidebar from './Sidebar/Sidebar';
import Content from './Content/Content';

const Layout = ({ children }) => {
  return (
    <AntLayout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sidebar />
      <Content>{children}</Content>
    </AntLayout>
  );
};

export default Layout;
