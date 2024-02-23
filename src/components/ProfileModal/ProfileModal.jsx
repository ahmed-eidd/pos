import { Modal } from 'antd';
import React from 'react';
import {
  ProfileModalStates,
  setProfileModalClose,
  setStep,
} from '../../store/profileModalSlice';
import ProfileDetails from './ProfileDetails/ProfileDetails';
import ConfirmLogoutStep from './ConfirmLogoutStep/ConfirmLogoutStep';
import OpeningBalanceStep from './OpeningBalanceStep/OpeningBalanceStep';
import FinalLogoutStep from './FinalLogoutStep/FinalLogoutStep';
import { useLogOut } from '../../hooks/query/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShowSheetReportStep from './ShowSheetReportStep/ShowSheetReportStep';

const ProfileModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.profileModal.open);
  const currentStep = useSelector((state) => state.profileModal.step);
  const setClose = () => {
    if (ProfileModalStates.SHOW_SHEET_REPORT === currentStep) {
      logOut();
      navigate('/login');
    }
    dispatch(setProfileModalClose());
  };
  const setStepHandler = (step) => dispatch(setStep(step));
  const { mutate: logOut, isLoading } = useLogOut(() => {});
  return (
    <Modal visible={isOpen} footer={null} onCancel={setClose}>
      {currentStep === ProfileModalStates.PROFILE && (
        <ProfileDetails
          onClick={() =>
            setStepHandler(ProfileModalStates.BEFORE_OPENING_BALANCE_STEP)
          }
        />
      )}
      {currentStep === ProfileModalStates.BEFORE_OPENING_BALANCE_STEP && (
        <ConfirmLogoutStep
          onClose={setClose}
          onClick={() =>
            setStepHandler(ProfileModalStates.OPENING_BALANCE_STEP)
          }
        >
          hello
        </ConfirmLogoutStep>
      )}
      {currentStep === ProfileModalStates.OPENING_BALANCE_STEP && (
        <OpeningBalanceStep
          onClose={setClose}
          onClick={() => setStepHandler(ProfileModalStates.SHOW_SHEET_REPORT)}
        >
          hello
        </OpeningBalanceStep>
      )}
      {currentStep === ProfileModalStates.SHOW_SHEET_REPORT && (
        <ShowSheetReportStep
          onClose={() => setStepHandler(ProfileModalStates.LOGOUT)}
          onClick={() => setStepHandler(ProfileModalStates.LOGOUT)}
          loading={isLoading}
        />
      )}
      {currentStep === ProfileModalStates.LOGOUT && (
        <FinalLogoutStep
          onClose={setClose}
          onClick={() => {
            logOut();
            navigate('/login');
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
