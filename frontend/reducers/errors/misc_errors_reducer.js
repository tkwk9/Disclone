import {
  RECEIVE_FRIENDS_ERROR
} from '../../actions/friends_actions';
import {
  RECEIVE_DM_ERROR
} from '../../actions/direct_messages_actions';
import {
  RESET_STATE,
  FORCE_LOGOUT
} from '../../actions/session_actions';

import lodash from 'lodash';
// FIX THIS
const defaultState = {
  friends: ""
};

const sessionErrorsReducer = (state = defaultState, action) => {
  let nextState = lodash.merge({}, state);
  switch (action.type) {
    case RECEIVE_FRIENDS_ERROR:
      nextState.friends = action.error;
      return nextState;
    case RECEIVE_DM_ERROR:
      nextState.friends = action.error;
      return nextState;
    case FORCE_LOGOUT:
      return defaultState;
    case RESET_STATE:
      return defaultState;
    default:
      return defaultState;
  }
};

export default sessionErrorsReducer;
