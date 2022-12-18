import React from 'react';
import classes from './Text.module.scss';
import classnames from 'classnames';

const Text = ({
  children,
  size = 'medium',
  weight = 'bold',
  color = 'black',
  label,
  className,
  block,
}) => {
  return (
    <p
      style={{ display: block ? 'block' : 'inline-block' }}
      className={
        label
          ? classnames(classes.normal, classes.base, classes.grey, className)
          : classnames(
              classes[size],
              classes[weight],
              classes[color],
              className
            )
      }
    >
      {children}
    </p>
  );
};

export default Text;
