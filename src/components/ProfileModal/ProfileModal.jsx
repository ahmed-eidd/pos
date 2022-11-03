import { Modal } from 'antd';
import React from 'react';
import { useZusStore } from '../../store/useStore';
import {
  ProfileModalStates,
  setProfileModalClose,
} from '../../store/profileModalSlice';
import ProfileDetails from './ProfileDetails/ProfileDetails';
import ConfirmLogoutStep from './ConfirmLogoutStep/ConfirmLogoutStep';
import OpeningBalanceStep from './OpeningBalanceStep/OpeningBalanceStep';
import FinalLogoutStep from './FinalLogoutStep/FinalLogoutStep';
import { useLogOut } from '../../hooks/query/useAuth';
import { useDispatch, useSelector } from 'react-redux';

const ProfileModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.profileModal.open);
  const currentStep = useSelector((state) => state.profileModal.step);
  const setClose = () => {
    dispatch(setProfileModalClose());
  };
  const setStep = (step) => dispatch(setStep(step));
  const { mutate: logOut, isLoading } = useLogOut(() => {});
  return (
    <Modal visible={isOpen} footer={null} onCancel={setClose}>
      {currentStep === ProfileModalStates.PROFILE && (
        <ProfileDetails
          onClick={() =>
            setStep(ProfileModalStates.BEFORE_OPENING_BALANCE_STEP)
          }
        />
      )}
      {currentStep === ProfileModalStates.BEFORE_OPENING_BALANCE_STEP && (
        <ConfirmLogoutStep
          onCancel={setClose}
          onClick={() => setStep(ProfileModalStates.OPENING_BALANCE_STEP)}
        >
          hello
        </ConfirmLogoutStep>
      )}
      {currentStep === ProfileModalStates.OPENING_BALANCE_STEP && (
        <OpeningBalanceStep
          onClose={setClose}
          onClick={() => setStep(ProfileModalStates.LOGOUT)}
        >
          hello
        </OpeningBalanceStep>
      )}
      {currentStep === ProfileModalStates.LOGOUT && (
        <FinalLogoutStep
          onClose={setClose}
          onClick={() => {
            logOut();
            setClose();
          }}
          loading={isLoading}
        >
          hello
        </FinalLogoutStep>
      )}
    </Modal>
  );
};

export default ProfileModal;
