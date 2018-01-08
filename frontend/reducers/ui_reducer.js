import {
  RECEIVE_SESSION_PAYLOAD,
  RESET_STATE
} from '../actions/session_actions';

import { TOGGLE_MODAL } from '../actions/ui_actions';
import lodash from 'lodash';

const defaultState = {
  sessionPayloadReceived: false,
  modalState: false,
  modalMode: undefined
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
    case RESET_STATE:
      return defaultState;
    default:
      return state;
  }
};

export default uiReducer;
