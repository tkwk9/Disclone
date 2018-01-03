import {
  RECEIVE_CURRENT_USER,
  RESET_STATE,
  FORCE_LOGOUT
} from '../actions/session_actions';

const defaultState = {
  currentUser: null
};

const sessionReducer = (state = defaultState, action) => {
  let nextState;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {currentUser: action.currentUser};
    case FORCE_LOGOUT:
      // action.disconnect();
      return defaultState;
    case RESET_STATE:
      return defaultState;
    default:
      return state;
  }
};

export default sessionReducer;
