import {
  RECEIVE_SESSION_PAYLOAD,
  RESET_STATE,
  FORCE_LOGOUT
} from '../../actions/session_actions';

import {
  RECEIVE_CHANNEL,
  REMOVE_CHANNEL
} from '../../actions/channels_actions';

import {
  RECEIVE_SERVER,
  REMOVE_SERVER
} from '../../actions/servers_actions';

import { RECEIVE_MESSAGES } from '../../actions/messages_actions';

import lodash from 'lodash';

const defaultState = {

};

const channelsReducer = (state = defaultState, action) => {
  let nextState = lodash.merge({}, state);
  switch (action.type) {
    case RECEIVE_MESSAGES:
      if(action.payload.channels){
        Object.keys(action.payload.channels).forEach((key) => {
          if (nextState[key]){
            nextState[key].messages = [ ...new Set(nextState[key].messages.concat(
              action.payload.channels[key].messages
            ))].sort();
            if (action.path !== `/${nextState[key].serverId}/${key}`){
              nextState[key].unreadCount =
              action.payload.channels[key].unreadCount;
            }
          } else {
            nextState[key] = action.payload.channels[key];
          }
        });
      }
      return nextState;
    case RECEIVE_SESSION_PAYLOAD:
    return action.payload.channels ?
      action.payload.channels : state;
    case RECEIVE_SERVER:
      if(action.payload.channels) {
        Object.keys(action.payload.channels).forEach((key) => {
          nextState[key] = action.payload.channels[key];
        });
      }
      return nextState;
    case RECEIVE_CHANNEL:
      if(action.payload.channels) {
        Object.keys(action.payload.channels).forEach((key) => {
          nextState[key] = action.payload.channels[key];
        });
      }
      return nextState;
    case REMOVE_SERVER:
      return nextState;
    case REMOVE_CHANNEL:
      return nextState;
    case RESET_STATE:
      return defaultState;
    case FORCE_LOGOUT:
      return defaultState;
    default:
      return nextState;
  }
};

export default channelsReducer;
