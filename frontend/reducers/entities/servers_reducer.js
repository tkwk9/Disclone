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

import lodash from 'lodash';

const defaultState = {

};

const serversReducer = (state = defaultState, action) => {
  let nextState = lodash.merge({}, state);
  let id;
  switch (action.type) {
    case RECEIVE_SESSION_PAYLOAD:
    return action.payload.servers ?
      action.payload.servers : state;
    case RECEIVE_SERVER:
      id = Object.keys(action.payload.servers)[0];
      nextState[id] = action.payload.servers[id];
      return nextState;
    case RECEIVE_CHANNEL:
      if (action.payload.servers) {
        id = Object.keys(action.payload.servers)[0];
        nextState[id].channelIds = action.payload.servers[id].channelIds;
      }
      return nextState;
    case REMOVE_SERVER:
      if (nextState[action.payload.deletedServerId]){
        delete nextState[action.payload.deletedServerId];
      }
      return nextState;
    case REMOVE_CHANNEL:
      if (action.payload.servers) {
        id = Object.keys(action.payload.servers)[0];
        nextState[id].channelIds = action.payload.servers[id].channelIds;
      }
      return nextState;
    case RESET_STATE:
      return defaultState;
    case FORCE_LOGOUT:
      return defaultState;
    default:
      return nextState;
  }
};

export default serversReducer;
