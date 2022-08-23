import React from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import AuthPage from '../pages/AuthPage/AuthPage';

const Routes = () => {
  return (
    <ReactRoutes>
      <Route path='/login' element={<AuthPage />} />
    </ReactRoutes>
  );
};

export default Routes;
