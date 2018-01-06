import {
  RECEIVE_CURRENT_USER,
  RESET_STATE,
  FORCE_LOGOUT
} from '../actions/session_actions';

import {
  RECEIVE_FRIENDS_LIST
} from '../actions/friends_actions';

import lodash from 'lodash';

const defaultState = {
  currentUser: null
};

const sessionReducer = (state = defaultState, action) => {
  let nextState = lodash.merge({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {currentUser: action.currentUser};
    case RECEIVE_FRIENDS_LIST: // DEBUG: MAY NEED DEBUGGING
      nextState.currentUser.friendsList = action.payload.friendsList;
      return nextState;
    case FORCE_LOGOUT:
      return defaultState;
    case RESET_STATE:
      return defaultState;
    default:
      return state;
  }
};

export default sessionReducer;
