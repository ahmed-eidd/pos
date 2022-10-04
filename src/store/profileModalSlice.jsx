export const ProfileModalStates = {
  PROFILE: 'PROFILE',
  BEFORE_OPENING_BALANCE_STEP: 'BEFORE_OPENING_BALANCE',
  OPENING_BALANCE_STEP: 'OPENING_BALANCE_STEP',
  LOGOUT: 'LOGOUT',
};

export const profileModaSlice = (set) => ({
  open: false,
  openingBalance: null,
  step: ProfileModalStates.PROFILE,
  setStep: (payload) =>
    set((state) => ({
      profileModal: {
        ...state.profileModal,
        step: payload,
      },
    })),
  setProfileModalOpen: () =>
    set((state) => ({
      profileModal: {
        ...state.profileModal,
        open: true,
      },
    })),
  setProfileModalClose: () =>
    set((state) => ({
      profileModal: {
        ...state.profileModal,
        step: ProfileModalStates.PROFILE,
        open: false,
      },
    })),
  setOpeningBalance: (payload) =>
    set((state) => ({
      profileModal: {
        ...state.profileModal,
        openingBalance: payload,
      },
    })),
});
