import { Input } from 'antd';
import clx from 'classnames';
import classes from './InputField.module.scss';

const InputField = ({
  radius,
  className,
  type,
  style,
  placeholder,
  onChange,
  ...props
}) => {
  return (
    <Input
      {...props}
      type={type}
      className={clx(classes.InputField, className, {
        [classes['radius-md']]: radius === 'md',
      })}
      style={style}
      placeholder={placeholder}
      onChange={onChange}
      
    />
  );
};

export default InputField;
