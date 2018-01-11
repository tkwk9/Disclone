import {
  RECEIVE_FRIENDS_ERROR
} from '../../actions/friends_actions';
import {
  RECEIVE_DM_ERROR
} from '../../actions/direct_messages_actions';
import {
  RECEIVE_SERVER_ERROR
} from '../../actions/servers_actions';
import {
  RECEIVE_CHANNEL_ERROR
} from '../../actions/channels_actions';
import {
  RESET_STATE,
  FORCE_LOGOUT
} from '../../actions/session_actions';

import lodash from 'lodash';
// FIX THIS
const defaultState = {
  friends: "",
  directMessages: "",
  servers: "",
  channels: ""
};

const sessionErrorsReducer = (state = defaultState, action) => {
  let nextState = lodash.merge({}, state);
  switch (action.type) {
    case RECEIVE_FRIENDS_ERROR:
      nextState.friends = action.error;
      return nextState;
    case RECEIVE_DM_ERROR:
      nextState.directMessages = action.error;
    case RECEIVE_CHANNEL_ERROR:
      nextState.channels = action.error;
    case RECEIVE_SERVER_ERROR:
      nextState.servers = action.error;
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
