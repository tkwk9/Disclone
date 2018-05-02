export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN';
export const TOGGLE_INF_REQ = 'TOGGLE_INF_REQ';
export const UPDATE_MAIN_PAGE_MODE = 'UPDATE_MAIN_PAGE_MODE';

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

export const updateMainPageMode = ({mainPageMode, channelId}) => {
  return {
    type: UPDATE_MAIN_PAGE_MODE,
    mainPageMode,
    channelId
  };
};
