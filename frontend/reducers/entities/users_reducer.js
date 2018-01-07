import {
  RECEIVE_FRIENDS_LIST
} from '../../actions/friends_actions';

import {
  RECEIVE_SESSION_PAYLOAD,
  RESET_STATE,
  FORCE_LOGOUT
} from '../../actions/session_actions';

import {
  RECEIVE_USER
} from '../../actions/users_actions';

import {
  RECEIVE_DM,
  REMOVE_DM
} from '../../actions/direct_messages_actions';

import lodash from 'lodash';

const defaultState = {

};

const usersReducer = (state = defaultState, action) => {
  let nextState = lodash.merge({}, state);
  switch (action.type) {
    case RECEIVE_SESSION_PAYLOAD:
      return action.payload.users ?
        action.payload.users : state;
    case RECEIVE_FRIENDS_LIST: // DEBUG: MAY NEED DEBUGGING
      if (action.payload.users){
        Object.keys(action.payload.users).forEach(key => {
          nextState[key] = action.payload.users[key];
        });
      }
      return nextState;
    case RECEIVE_DM:
      if (action.payload.users){
        Object.keys(action.payload.users).forEach(key => {
          nextState[key] = action.payload.users[key];
        });
      }
      return nextState;
    case RECEIVE_USER:
      nextState[action.user.id] = action.user;
      return nextState;
    case RESET_STATE:
      return defaultState;
    case FORCE_LOGOUT:
      return defaultState;
    default:
      return nextState;
  }
};

export default usersReducer;
