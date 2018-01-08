import {
  RECEIVE_SESSION_PAYLOAD,
  RESET_STATE,
  FORCE_LOGOUT
} from '../../actions/session_actions';

import {
  RECEIVE_DM,
  REMOVE_DM
} from '../../actions/direct_messages_actions';

import { RECEIVE_MESSAGES } from '../../actions/messages_actions';
import lodash from 'lodash';

const defaultState = {

};

const directMessagesReducer = (state = defaultState, action) => {
  let nextState = lodash.merge({}, state);
  let id;
  switch (action.type){
    case RECEIVE_MESSAGES:
      if(action.payload.directMessages){
        Object.keys(action.payload.directMessages).forEach((key) => {
          if (nextState[key]){
            nextState[key].messages = [ ...new Set(nextState[key].messages.concat(
              action.payload.directMessages[key].messages
            ))].sort();
            if (action.path !== `/@me/${key}`){
              nextState[key].unreadCount =
              action.payload.directMessages[key].unreadCount;
            }
          } else {
            nextState[key] = action.payload.directMessages[key];
          }
        });
      } else if (action.payload.channel) {
        // TODO: process channel
      }
      return nextState;
    case RECEIVE_DM:
      id = Object.keys(action.payload.directMessages)[0];
      if (nextState[id]){
        nextState[id].messages = [ ...new Set(nextState[id].messages.concat(
          action.payload.directMessages[id].messages
        ))].sort();
        // console.log(action.path);
        if (action.path !== `/@me/${id}`){
          nextState[id].unreadCount =
          action.payload.directMessages[id].unreadCount;
        }
      } else {
        nextState[id] = action.payload.directMessages[id];
      }
      return nextState;
    case REMOVE_DM:
      id = Object.keys(action.payload.directMessages)[0];
      if (nextState[id]){
        delete nextState[id];
      }
      return nextState;
    case RECEIVE_SESSION_PAYLOAD:
      return action.payload.directMessages ?
        action.payload.directMessages : state;
    case RESET_STATE:
      return defaultState;
    case FORCE_LOGOUT:
      return defaultState;
    default:
      return state;
  }
};

export default directMessagesReducer;
