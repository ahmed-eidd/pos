import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

function StartApp() {
  return (
    <div className="start-app-page">
      <Link to="/">
        <Button type="primary" size="large">
          Start POS App
        </Button>
      </Link>
    </div>
  );
}

export default StartApp;
