import React from 'react';
import { Navigate, Route, Routes as ReactRoutes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { locale } from '../locale';
import AuthPage from '../pages/AuthPage/AuthPage';
import Categories from '../pages/Categories/Categories';
import Checkout from '../pages/Checkout/Checkout';
import SavedOrders from '../pages/SavedOrders/SavedOrders';
import CashMangment from '../pages/CashMangment/CashMangment';
import MyProfile from '../pages/MyProfile/MyProfile';
import OrderPlaced from '../pages/OrderPlaced/OrderPlaced';
import Orders from '../pages/Orders/Orders';
import ReviewOrder from '../pages/ReviewOrder/ReviewOrder';
import ReceiptDetails from '../pages/ReceiptDetails/ReceiptDetails';
import { useSelector } from 'react-redux';

const Routes = () => {
  const token = useSelector((state) => state.auth.token);
  const sheet = useSelector((state) => state.auth.sheet);
  // const posId = useSelector((state) => state.auth.posId);

  if (!token && !sheet) {
  }

  return (
    <ReactRoutes>
      {token && sheet ? (
        <>
          <Route
            // path={`/${locale.sidebar.sidebar.menu.categories.link}/`}
            path={`/*`}
            element={
              <Navigate
                to={`/${locale.sidebar.sidebar.menu.categories.link}/`}
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
              element={<SavedOrders />}
            />
            <Route
              path={`/${locale.sidebar.sidebar.menu.settings.link}`}
              element={<MyProfile />}
            />
          </Route>

          <Route element={<Layout showCartSideabar={false} />}>
            <Route
              path={`/${locale.sidebar.sidebar.menu.money.link}`}
              element={<CashMangment />}
            />
            <Route path={'/checkout'} element={<Checkout />} />
            <Route path={'/review-order'} element={<ReviewOrder />} />
            <Route path={'/order-placed'} element={<OrderPlaced />} />
          </Route>

          <Route
            element={
              <Layout
                sidebarStyle={{ visibility: 'hidden' }}
                showCartSideabar={false}
              />
            }
          >
            <Route path='/order/:id' element={<ReceiptDetails />} />
          </Route>
        </>
      ) : (
        <>
          <Route
            // path={`/${locale.sidebar.sidebar.menu.categories.link}/`}
            path={`/*`}
            element={<Navigate to={'/login'} replace />}
          />
          <Route path='/login' element={<AuthPage />} />
        </>
      )}
    </ReactRoutes>
  );
};

export default Routes;
