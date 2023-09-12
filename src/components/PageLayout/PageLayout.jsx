import classnames from 'classnames';
import React from 'react';
import classes from './PageLayout.module.scss';

const PageLayout = ({
  title,
  children,
  contentClassName,
  containerClassName,
  style,
}) => {
  return (
    <div className={classnames(classes.PageLayout, containerClassName)}>
      <h3 className={classes.PageLayout__Title}>{title}</h3>
      <div
        className={classnames(classes.PageLayout__Content, contentClassName)}
        style={style}
      >
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
