export const TOGGLE_MODAL = 'TOGGLE_MODAL';

export const toggleModal = (modalState, modalMode) => {
  return {
    type: TOGGLE_MODAL,
    modalState,
    modalMode
  };
};
