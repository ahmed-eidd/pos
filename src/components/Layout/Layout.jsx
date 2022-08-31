import React from 'react';
import { Layout as AntLayout } from 'antd';
import Sidebar from './Sidebar/Sidebar';
import Content from './Content/Content';
import { Outlet } from 'react-router-dom';
import CartSidebar from './CartSidebar/CartSidebar';
import SearchBar from '../SearchBar/SearchBar';

const Layout = () => {
  return (
    <AntLayout
      style={{
        height: '100vh',
      }}
    >
      <Sidebar />
      <AntLayout>
        <SearchBar />
        <Content>
          <Outlet />
        </Content>
      </AntLayout>
      <CartSidebar />
    </AntLayout>
  );
};

export default Layout;