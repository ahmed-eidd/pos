import { Menu, Layout } from 'antd';
import React, { useState } from 'react';
import Logo from '../../../assets/logo.png';
import classes from './Sidebar.module.scss';
import './sidebar-ant.scss';
import Burger from '../../../assets/sidebarBurger.png';

const { Sider } = Layout;
const getItem = (label, key, children, icon) => {
  return {
    key,
    icon,
    children,
    label,
  };
};
const items = [
  getItem('Option 1', '1'),
  getItem('Option 2', '2'),
  getItem('User', 'sub1', [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9'),
];
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
        <img src={Logo} className={classes.Sidebar__Logo} alt='logo' />
        {!collapsed && (
          <Menu defaultSelectedKeys={['1']} mode='inline' items={items} />
        )}
      </div>
      <img
        className={classes.Sidebar__Burger}
        onClick={() => setCollapsed(!collapsed)}
        src={Burger}
        alt='burger menu'
      />
    </Sider>
  );
};

export default Sidebar;
