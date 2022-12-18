import React from 'react';

const Box = ({ color }) => {
  return (
    <svg
      width='24'
      height='20'
      viewBox='0 0 24 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M21 6V19H3V6M10 10H14M1 1H23V6H1V1Z'
        stroke={color || `#667085`}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default Box;
