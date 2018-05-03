import {
  RECEIVE_SESSION_PAYLOAD,
  RESET_STATE,
  FORCE_LOGOUT
} from '../actions/session_actions';

import { TOGGLE_MODAL, TOGGLE_DROPDOWN, TOGGLE_INF_REQ, UPDATE_MAIN_PAGE_MODE, UPDATE_FRIENDLIST_MODE } from '../actions/ui_actions';
import lodash from 'lodash';

const defaultState = {
  sessionPayloadReceived: false,
  modalState: false,
  modalMode: "",
  dropdownOn: false,
  infReq: false,
  serverId: 'friends_list',
  messageableId: null,
  friendListMode: 'all'
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
      nextState.dropdownOn = action.dropdownOn;
      return nextState;
    case TOGGLE_INF_REQ:
      nextState.infReq = action.infReq;
      return nextState;
    case RESET_STATE:
      return defaultState;
    case UPDATE_MAIN_PAGE_MODE:
      nextState.serverId = action.serverId;
      nextState.messageableId = action.messageableId;
      return nextState;
    case FORCE_LOGOUT:
      nextState.modalState = true;
      nextState.modalMode = 'errorPopup_You were logged in from another location.';
      nextState.sessionPayloadReceived = false;
      return nextState;
    case UPDATE_FRIENDLIST_MODE:
      nextState.friendListMode = action.friendListMode;
      return nextState;
    default:
      return state;
  }
};

export default uiReducer;
