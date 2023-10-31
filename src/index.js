import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// (function () {
//   if (!sessionStorage.getItem('firstLoad')) {
//     sessionStorage.setItem('firstLoad', true);
//     window.location.reload();
//   }
// })();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  // prettier-ignore
  <BrowserRouter 
  basename="/pos"
  >
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);
