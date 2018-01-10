export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN';

export const toggleModal = (modalState, modalMode) => {
  return {
    type: TOGGLE_MODAL,
    modalState,
    modalMode
  };
};

export const toggleDropdown = (toggleState, toggleMode) => {
  return {
    type: TOGGLE_DROPDOWN,
    toggleState,
    toggleMode
  };
};
