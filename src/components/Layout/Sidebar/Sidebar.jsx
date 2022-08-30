import { Layout } from 'antd';
import React, { useState } from 'react';
import Logo from '../../../assets/logo.png';
import classes from './Sidebar.module.scss';
import './sidebar-ant.scss';
import Burger from '../../../assets/sidebarBurger.png';
import NavMenu from './NavMenu/NavMenu';

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState();
  return (
    <Sider
      className={classes.Sidebar}
      collapsible
      theme='light'
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{ height: '100vh' }}
      collapsedWidth={93}
      trigger={null}
    >
      <div className={classes.Sidebar__Wrapper}>
        <img src={Logo} className={classes.Sidebar__Wrapper__Logo} alt='logo' />
        {!collapsed && (
          <>
            <NavMenu />
          </>
        )}
      </div>
      <img
        className={classes.Sidebar__Wrapper__Burger}
        onClick={() => setCollapsed(!collapsed)}
        src={Burger}
        alt='burger menu'
      />
    </Sider>
  );
};

export default Sidebar;
