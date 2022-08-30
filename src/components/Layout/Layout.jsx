import React from 'react';
import { Layout as AntLayout } from 'antd';
import Sidebar from './Sidebar/Sidebar';
import Content from './Content/Content';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <AntLayout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sidebar />
      <Content>
        <Outlet />
      </Content>
    </AntLayout>
  );
};

export default Layout;
