import { Modal } from 'antd';
import React from 'react';
// import { useProfileModal } from '../../store/useProfileModal';
import { useZusStore } from '../../store/useStore';
import { ProfileModalStates } from '../../store/profileModalSlice';
import ProfileDetails from './ProfileDetails/ProfileDetails';
import ConfirmLogoutStep from './ConfirmLogoutStep/ConfirmLogoutStep';
import OpeningBalanceStep from './OpeningBalanceStep/OpeningBalanceStep';
import FinalLogoutStep from './FinalLogoutStep/FinalLogoutStep';

const ProfileModal = () => {
  const isOpen = useZusStore((state) => state.profileModal.open);
  const setClose = useZusStore(
    (state) => state.profileModal.setProfileModalClose
  );
  const currentStep = useZusStore((state) => state.profileModal.step);
  const setStep = useZusStore((state) => state.profileModal.setStep);
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
          onClose={setClose}
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
        <FinalLogoutStep onClose={setClose}>hello</FinalLogoutStep>
      )}
    </Modal>
  );
};

export default ProfileModal;
