import {
  RECEIVE_FRIENDS_ERROR
} from '../../actions/friends_actions';
import {
  RECEIVE_DM_ERROR
} from '../../actions/direct_messages_actions';

import lodash from 'lodash';
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
    default:
      return defaultState;
  }
};

export default sessionErrorsReducer;
