import React from 'react';
import Button from '../../Button/Button';
import Text from '../../Text/Text';
import userIcon from '../../../assets/profile/user.png';
// import clockIcon from '../../../assets/profile/clock.png';
// import coinStackIcon from '../../../assets/profile/coin-stack.png';
// import shoppingIcon from '../../../assets/profile/shopping-bag.png';
// import archiveIcon from '../../../assets/profile/archive.png';
import classes from './ProfileDetails.module.scss';
import { useSelector } from 'react-redux';
import { Popconfirm } from 'antd';
import Flex from '../../Flex/Flex';

const ProfileDetails = ({ onClick, onLogOut }) => {
  const currentUser = useSelector((s) => s.auth?.currentUser);
  return (
    <div className={classes.ProfileDetails}>
      <Text className={classes.ProfileDetails__Title}>بيانات أمين الصندوق</Text>

      <div className={classes.ProfileDetails__Wrapper}>
        <img
          className={classes.ProfileDetails__Wrapper__Icon}
          src={userIcon}
          alt="user"
        />
        <Text className={classes.ProfileDetails__Wrapper__Label} color="grey">
          اسم أمين الصندوق:
        </Text>
        <Text className={classes.ProfileDetails__Wrapper__Text}>
          {currentUser?.name}
        </Text>
      </div>
      {/* <div className={classes.ProfileDetails__Wrapper}>
        <img
          src={clockIcon}
          alt='user'
          className={classes.ProfileDetails__Wrapper__Icon}
        />
        <Text color='grey'>اسم أمين الصندوق:</Text>
        <Text>محمود سيف</Text>
      </div>
      <div className={classes.ProfileDetails__Wrapper}>
        <img
          src={coinStackIcon}
          alt='user'
          className={classes.ProfileDetails__Wrapper__Icon}
        />
        <Text color='grey'>اسم أمين الصندوق:</Text>
        <Text>محمود سيف</Text>
      </div>
      <div className={classes.ProfileDetails__Wrapper}>
        <img
          src={shoppingIcon}
          alt='user'
          className={classes.ProfileDetails__Wrapper__Icon}
        />
        <Text color='grey'>اسم أمين الصندوق:</Text>
        <Text>محمود سيف</Text>
      </div>
      <div className={classes.ProfileDetails__Wrapper}>
        <img
          src={archiveIcon}
          alt='user'
          className={classes.ProfileDetails__Wrapper__Icon}
        />
        <Text color='grey'>اسم أمين الصندوق:</Text>
        <Text>محمود سيف</Text>
      </div> */}
      <Flex justify="space-between" align='center' gap={10}>
        <Popconfirm
          title="سيتم تسجيل الخروج في حالة الاستمرار"
          description=""
          onConfirm={onLogOut}
          onCancel={() => {}}
          okText="نعم"
          cancelText="لا"
        >
          <Button type="primary" fullwidth>تسجيل الخروج</Button>
        </Popconfirm>
        <Popconfirm
          title="سيتم الغاء الشيفت في حالة الاستمرار"
          description=""
          onConfirm={onClick}
          onCancel={() => {}}
          okText="نعم"
          cancelText="لا"
        >
          <Button type="danger" fullwidth>الغاء الشيفت</Button>
        </Popconfirm>
      </Flex>
    </div>
  );
};

export default ProfileDetails;
