import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes as ReactRoutes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { locale } from "../locale";
import AuthPage from "../pages/AuthPage/AuthPage";
import Categories from "../pages/Categories/Categories";
import Checkout from "../pages/Checkout/Checkout";
import SavedOrders from "../pages/SavedOrders/SavedOrders";
import CashMangment from "../pages/CashMangment/CashMangment";
import MyProfile from "../pages/MyProfile/MyProfile";
import OrderPlaced from "../pages/OrderPlaced/OrderPlaced";
import Orders from "../pages/Orders/Orders";
import ReviewOrder from "../pages/ReviewOrder/ReviewOrder";
import ReceiptDetails from "../pages/ReceiptDetails/ReceiptDetails";
import StartApp from "../components/StartApp/StartApp";
import { getToken } from "../helper/localStorage";
import CanceledOrders from "../pages/CanceledOrders";
import CanceledOrderDetails from "../pages/CanceledOrderDetails";
import { useSelector } from "react-redux";
import { loginTypeEnum } from "../store/authSlice";
import { useCurrentLoginType } from "../hooks/useCurrentLoginType";

const isToken = getToken();

const Routes = () => {
  const { isCashier } = useCurrentLoginType();
  const isLogin = useSelector((state) => state.auth.isLoginIn);
  const location = useLocation();
  const navigate = useNavigate();
  console.log({ isLogin });

  useEffect(() => {
    if (location?.pathname !== "/login" && !isLogin) {
      navigate("/login");
    }
  }, [location, navigate, isLogin]);
  return (
    <ReactRoutes>
      <Route element={<Layout />}>
        <Route
          path={`/`}
          element={
            isLogin ? (
              <Navigate
                to={`/${locale.sidebar.sidebar.menu.categories.link}`}
              />
            ) : (
              <Navigate to={`/login`} />
            )
          }
        />
        <Route
          path={`/${locale.sidebar.sidebar.menu.categories.link}/*`}
          element={<Categories />}
        />
        {isCashier && (
          <>
            <Route path="/canceled-order" element={<CanceledOrders />} />
            <Route
              path={`/${locale.sidebar.sidebar.menu.orders.link}`}
              element={<Orders />}
            />
          </>
        )}
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
        <Route path={"/checkout"} element={<Checkout />} />
        <Route path={"/review-order"} element={<ReviewOrder />} />
        <Route path={"/order-placed"} element={<OrderPlaced />} />
      </Route>

      <Route
        element={
          <Layout
            sidebarStyle={{ visibility: "hidden" }}
            showCartSideabar={false}
          />
        }
      >
        <Route path="/order/:id" element={<ReceiptDetails />} />
        <Route path="/canceled-order/:id" element={<CanceledOrderDetails />} />
      </Route>

      <Route path="/login" element={<AuthPage />} />
      {/* <Route path={'*'} element={<Navigate to='/' />} /> */}
    </ReactRoutes>
  );
};

export default Routes;
