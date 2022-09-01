import React from 'react';
import classes from './Text.module.scss';
import classnames from 'classnames';

const Text = ({
  children,
  size = 'md',
  weight = 'bold',
  color = 'black',
  label,
}) => {
  return (
    <p
      style={{ display: 'inline-block' }}
      className={
        label
          ? classnames(classes.normal, classes.base, classes.grey)
          : classnames(classes[size], classes[weight], classes[color])
      }
    >
      {children}
    </p>
  );
};

export default Text;
