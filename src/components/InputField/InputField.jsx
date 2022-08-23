import { Input } from 'antd';
import clx from 'classnames';
import classes from './InputField.module.scss';

const InputField = ({ className, ...props }) => {
  return <Input {...props} className={clx(classes.InputField, className)} />;
};

export default InputField;
