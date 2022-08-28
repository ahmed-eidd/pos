import React from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import AuthPage from '../pages/AuthPage/AuthPage';

const Routes = () => {
  return (
    <ReactRoutes>
      <Route path='/login' element={<AuthPage />} />
      <Route path='/' element={<Layout />}></Route>
    </ReactRoutes>
  );
};

export default Routes;
