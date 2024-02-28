import React from 'react';
import { Layout as AntLayout } from 'antd';
import Sidebar from './Sidebar/Sidebar';
import Content from './Content/Content';
import { Outlet, useLocation } from 'react-router-dom';
import CartSidebar from './CartSidebar/CartSidebar';
import SearchBar from '../SearchBar/SearchBar';
import { locale } from '../../locale';
import ProfileModal from '../ProfileModal/ProfileModal';

const Layout = ({
  showCartSideabar = true,
  showSidebar = 'true',
  sidebarStyle,
}) => {
  const location = useLocation();
  return (
    <AntLayout
      style={{
        height: '100vh',
      }}
    >
      <Sidebar style={sidebarStyle} />
      <AntLayout>
        {location.pathname.includes(
          locale.sidebar.sidebar.menu.categories.link,
        ) && <SearchBar />}
        <Content>
          <Outlet />
        </Content>
      </AntLayout>
      {showCartSideabar && <CartSidebar />}
      <ProfileModal />
    </AntLayout>
  );
};

export default Layout;
