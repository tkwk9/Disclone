import {
  RECEIVE_SESSION_ERRORS,
  RECEIVE_CURRENT_USER,
  RESET_STATE,
  FORCE_LOGOUT
} from '../../actions/session_actions';

const defaultState = [];

const sessionErrorsReducer = (state = defaultState, action) => {
  let nextState;
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return defaultState;
    case RESET_STATE:
      return defaultState;
    case FORCE_LOGOUT:
      return defaultState;
    default:
      return state;
  }
};

export default sessionErrorsReducer;
