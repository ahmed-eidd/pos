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
import classNames from 'classnames';
import { setProfileModalOpen } from '../../../../store/profileModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { loginTypeEnum } from '../../../../store/authSlice';
import { useCurrentLoginType } from '../../../../hooks/useCurrentLoginType';
import { setWaiterShiftChangeModalOpen } from '../../../../store/waiterShiftChangeModalSlice';

const MenuItem = ({ to, text, icon, onClick, isButton }) => {
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
  const Element = isButton ? 'div' : NavLink;
  return (
    <>
      <Element
        onClick={onClick}
        // className={({ isActive }) => {
        //   if (isActive) {
        //     return [classes.NavMenu__MenuItem, classes.MenuItemActive].join(
        //       ' '
        //     );
        //   }
        //   return classes.NavMenu__MenuItem;
        // }}
        className={classNames(classes.NavMenu__MenuItem, {
          [classes['MenuItemActive']]: isActive,
        })}
        to={to}
      >
        <RenderedIcon color={isActive ? scssVar.primaryColor : false} />
        <p className={classes.NavMenu__MenuItem__Text}>{text}</p>
      </Element>
    </>
  );
};

const NavMenu = () => {
  const { isCashier, isWaiter } = useCurrentLoginType();
  const dispatch = useDispatch();
  const [currentLang] = useCurrentLang();
  const localeSidebar = locale.sidebar.sidebar.menu;

  return (
    <div className={classes.NavMenu}>
      <MenuItem
        text={localeSidebar.categories[currentLang]}
        to={localeSidebar.categories.link}
        icon={MenuCubesIcon}
      />
      {isCashier && (
        <>
          <MenuItem
            text={localeSidebar.orders[currentLang]}
            to={localeSidebar.orders.link}
            icon={MenuCartIcon}
          />
          <MenuItem
            text="الطلبات الملغاة"
            to="canceled-order"
            icon={MenuMoneyIcon}
          />
        </>
      )}
      <MenuItem
        text={localeSidebar.hold[currentLang]}
        to={localeSidebar.hold.link}
        icon={MenuBoxIcon}
      />
      {/* <MenuItem
        text={localeSidebar.money[currentLang]}
        to={localeSidebar.money.link}
        icon={MenuMoneyIcon}
      /> */}
      {
        isCashier && (
          <MenuItem
            text={localeSidebar.settings[currentLang]}
            to={localeSidebar.settings.link}
            icon={MenuSettingsIcon}
            onClick={() => dispatch(setProfileModalOpen())}
            isButton
          />
        )
      }
      {
        isWaiter &&
        <MenuItem
          text={localeSidebar.waiterShiftChange[currentLang]}
          to={localeSidebar.waiterShiftChange.link}
          icon={MenuSettingsIcon}
          onClick={() => {
            dispatch(setWaiterShiftChangeModalOpen())
          }}
          isButton
        />
      }
    </div>
  );
};

export default NavMenu;
