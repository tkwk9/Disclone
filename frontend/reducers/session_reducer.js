import {
  RECEIVE_CURRENT_USER,
  RESET_STATE
} from '../actions/session_actions';

const defaultState = {
  currentUser: null
};

const sessionReducer = (state = defaultState, action) => {
  let nextState;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {currentUser: action.currentUser};
    case RESET_STATE:
      return defaultState;
    default:
      return state;
  }
};

export default sessionReducer;
