import {
  RECEIVE_SESSION_PAYLOAD,
  RESET_STATE
} from '../actions/session_actions';

const defaultState = {
  currentUser: null
};

const sessionReducer = (state = defaultState, action) => {
  let nextState;
  switch (action.type) {
    case RECEIVE_SESSION_PAYLOAD:
      return action.payload.session;
    case RESET_STATE:
      return defaultState;
    default:
      return state;
  }
};

export default sessionReducer;
