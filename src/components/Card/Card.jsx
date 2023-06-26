import { css } from '@emotion/css';
import React from 'react';

const Card = ({ name, id, price, onClick, isLoading }) => {
  const CardStyles = css`
    width: 112px;
    padding: 10px;
    height: 100%;
    min-height: 100px;
    border: 1px solid #eee;
    border-radius: 4px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    transition: 0.1s ease-in;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);

    &:active {
      transform: translateY(3px);
      box-shadow: none;
    }

    .name {
      font-weight: 600;
      font-size: 14px;
      text-align: center;
      line-height: 1.2;
      margin-bottom: 5px;
    }
    .price {
      font-weight: 700;
      font-size: 16px;
      color: #006aff;
    }
  `;
  return (
    <div
      aria-disabled={true}
      onClick={() => {
        if (isLoading) return;
        onClick();
      }}
      key={id}
      className={CardStyles}
    >
      <p className="name">{name}</p>
      {price && <p className="price">{price}</p>}
    </div>
  );
};

export default Card;
