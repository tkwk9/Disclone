import { RECEIVE_SESSION_ERRORS, RECEIVE_SESSION_PAYLOAD } from '../actions/session_actions';

const defaultState = [];

const sessionErrorsReducer = (state = defaultState, action) => {
  let nextState;
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_SESSION_PAYLOAD:
      return defaultState;
    default:
      return state;
  }
};

export default sessionErrorsReducer;
