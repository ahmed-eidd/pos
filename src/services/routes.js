import React from 'react';
import { Navigate, Route, Routes as ReactRoutes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { locale } from '../locale';
import AuthPage from '../pages/AuthPage/AuthPage';
import Categories from '../pages/Categories/Categories';
import Checkout from '../pages/Checkout/Checkout';
import HoldOrder from '../pages/HoldOrders/HoldOrder';
import MoneySettings from '../pages/MoneySettings.jsx/MoneySettings';
import MyProfile from '../pages/MyProfile/MyProfile';
import Orders from '../pages/Orders/Orders';

const Routes = () => {
  return (
    <ReactRoutes>
      <Route path='/login' element={<AuthPage />} />
      <Route
        path={`/${locale.sidebar.sidebar.menu.categories.link}/`}
        element={
          <Navigate
            to={`/${locale.sidebar.sidebar.menu.categories.link}/pizza`}
            replace
          />
        }
      />

      <Route element={<Layout />}>
        <Route
          path={`/${locale.sidebar.sidebar.menu.categories.link}/*`}
          element={<Categories />}
        />
        <Route
          path={`/${locale.sidebar.sidebar.menu.orders.link}`}
          element={<Orders />}
        />
        <Route
          path={`/${locale.sidebar.sidebar.menu.hold.link}`}
          element={<HoldOrder />}
        />
        <Route
          path={`/${locale.sidebar.sidebar.menu.money.link}`}
          element={<MoneySettings />}
        />
        <Route
          path={`/${locale.sidebar.sidebar.menu.settings.link}`}
          element={<MyProfile />}
        />
      </Route>

      <Route element={<Layout showCartSideabar={false} />}>
        <Route path={'/checkout'} element={<Checkout />} />
      </Route>
    </ReactRoutes>
  );
};

export default Routes;
