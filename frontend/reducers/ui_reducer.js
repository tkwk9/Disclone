import {
  RECEIVE_SESSION_PAYLOAD,
  RESET_STATE,
  FORCE_LOGOUT
} from '../actions/session_actions';

import { TOGGLE_MODAL, TOGGLE_DROPDOWN, TOGGLE_INF_REQ } from '../actions/ui_actions';
import lodash from 'lodash';

const defaultState = {
  sessionPayloadReceived: false,
  modalState: false,
  modalMode: "",
  toggleState: false,
  toggleMode: undefined,
  infReq: false
};

const uiReducer = (state = defaultState, action) => {
  let nextState = lodash.merge({}, state);
  switch (action.type) {
    case RECEIVE_SESSION_PAYLOAD:
      nextState.sessionPayloadReceived =
        action.payload.ui.sessionPayloadReceived;
      return nextState;
    case TOGGLE_MODAL:
      nextState.modalState = action.modalState;
      nextState.modalMode = action.modalMode;
      return nextState;
    case TOGGLE_DROPDOWN:
      nextState.toggleState = action.toggleState;
      nextState.toggleMode = action.toggleMode;
      return nextState;
    case TOGGLE_INF_REQ:
      nextState.infReq = action.infReq;
      return nextState;
    case RESET_STATE:
      return defaultState;
    case FORCE_LOGOUT:
      nextState.modalState = true;
      nextState.modalMode = 'errorPopup_You were logged in from another location.';
      nextState.sessionPayloadReceived = false;
      return nextState;
    default:
      return state;
  }
};

export default uiReducer;
