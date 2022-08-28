import { Input } from 'antd';
import clx from 'classnames';
import classes from './InputField.module.scss';

const InputField = ({ className, type, ...props }) => {
  return (
    <Input
      {...props}
      type={type}
      className={clx(classes.InputField, className)}
    />
  );
};

export default InputField;
