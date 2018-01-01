import {
  RECEIVE_SESSION_ERRORS,
  RECEIVE_CURRENT_USER
} from '../../actions/session_actions';

const defaultState = [];

const sessionErrorsReducer = (state = defaultState, action) => {
  let nextState;
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return defaultState;
    default:
      return state;
  }
};

export default sessionErrorsReducer;
