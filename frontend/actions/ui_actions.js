export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN';
export const TOGGLE_INF_REQ = 'TOGGLE_INF_REQ';

export const toggleModal = (modalState, modalMode) => {
  return {
    type: TOGGLE_MODAL,
    modalState,
    modalMode
  };
};

export const toggleDropdown = (dropdownState, dropdownMode) => {
  return {
    type: TOGGLE_DROPDOWN,
    dropdownState,
    dropdownMode
  };
};

export const toggleInfReq = (infReq) => {
  return {
    type: TOGGLE_INF_REQ,
    infReq
  };
};
