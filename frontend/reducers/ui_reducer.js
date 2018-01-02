import {
  RECEIVE_SESSION_PAYLOAD,
  RESET_STATE
} from '../actions/session_actions';

const defaultState = {
  sessionPayloadReceived: false
};

const uiReducer = (state = defaultState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_SESSION_PAYLOAD:
      nextState.sessionPayloadReceived =
        action.payload.ui.sessionPayloadReceived;
      return nextState;
    case RESET_STATE:
      return defaultState;
    default:
      return state;
  }
};

export default uiReducer;
