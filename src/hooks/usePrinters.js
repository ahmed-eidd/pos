import React, { useEffect, useState } from 'react';
// const { remote } = require('electron');
// import { remote } from 'electron';

function usePrinters() {
  const [printers, setPrinters] = useState([]);

  const getPrinters = () => {
    console.log(navigator);
  };

  useEffect(() => {
    getPrinters();
  }, []);

  return { printers };
}

export default usePrinters;
