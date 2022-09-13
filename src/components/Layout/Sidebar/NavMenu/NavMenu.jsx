import React, { useEffect, useState } from 'react';
import classes from './NavMenu.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import MenuCubesIcon from '../../../../icons/SideMenuIcons/Cubes/Cubes';
import MenuCartIcon from '../../../../icons/SideMenuIcons/Cart/Cart';
import MenuBoxIcon from '../../../../icons/SideMenuIcons/Box/Box';
import MenuMoneyIcon from '../../../../icons/SideMenuIcons/Money/Money';
import MenuSettingsIcon from '../../../../icons/SideMenuIcons/Settings/Settings';
import { useCurrentLang } from '../../../../hooks/useCurrentLang';
import { locale } from '../../../../locale';
import { scssVar } from '../../../../styles/scssVars';
import { useZusStore } from '../../../../store/useStore';

const MenuItem = ({ to, text, icon, onClick }) => {
  const [isActive, setIsActive] = useState(false);
  const RenderedIcon = icon;
  const location = useLocation();

  /* A hook that is used to detect the current location of the user. */

  useEffect(() => {
    if (location.pathname.includes(to)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [location, to]);
  return (
    <NavLink
      onClick={onClick}
      className={({ isActive }) => {
        if (isActive) {
          return [classes.NavMenu__MenuItem, classes.MenuItemActive].join(' ');
        }
        return classes.NavMenu__MenuItem;
      }}
      to={to}
    >
      <RenderedIcon color={isActive ? scssVar.primaryColor : false} />
      <p className={classes.NavMenu__MenuItem__Text}>{text}</p>
    </NavLink>
  );
};

const NavMenu = () => {
  const [currentLang] = useCurrentLang();
  const localeSidebar = locale.sidebar.sidebar.menu;
  const onProfileOpen = useZusStore(
    (state) => state.profileModal.setProfileModalOpen
  );
  return (
    <div className={classes.NavMenu}>
      <MenuItem
        text={localeSidebar.categories[currentLang]}
        to={localeSidebar.categories.link}
        icon={MenuCubesIcon}
      />
      <MenuItem
        text={localeSidebar.orders[currentLang]}
        to={localeSidebar.orders.link}
        icon={MenuCartIcon}
      />
      <MenuItem
        text={localeSidebar.hold[currentLang]}
        to={localeSidebar.hold.link}
        icon={MenuBoxIcon}
      />
      <MenuItem
        text={localeSidebar.money[currentLang]}
        to={localeSidebar.money.link}
        icon={MenuMoneyIcon}
      />
      <MenuItem
        text={localeSidebar.settings[currentLang]}
        to={localeSidebar.settings.link}
        icon={MenuSettingsIcon}
        onClick={() => onProfileOpen()}
      />
    </div>
  );
};

export default NavMenu;
