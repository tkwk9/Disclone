import { RECEIVE_SESSION_PAYLOAD } from '../actions/session_actions';

const defaultState = {
  currentUser: null
};

const sessionReducer = (state = defaultState, action) => {
  let nextState;
  switch (action.type) {
    case RECEIVE_SESSION_PAYLOAD:
      return action.payload.session;
    default:
      return state;
  }
};

export default sessionReducer;
