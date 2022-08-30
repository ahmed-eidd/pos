import React from 'react';
import { Layout as AntLayout } from 'antd';
import classes from './Content.module.scss';

const { Content: AntContent } = AntLayout;
const Content = ({ children }) => {
  return <AntContent className={classes.Content}>{children}</AntContent>;
};

export default Content;
