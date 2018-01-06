import {
  RECEIVE_SESSION_PAYLOAD,
  RESET_STATE,
  FORCE_LOGOUT
} from '../../actions/session_actions';
import { RECEIVE_MESSAGES } from '../../actions/messages_actions';
import lodash from 'lodash';

const defaultState = {

};

const directMessagesReducer = (state = defaultState, action) => {
  let nextState = lodash.merge({}, state);
  switch (action.type){
    case RECEIVE_MESSAGES:
      if(action.payload.directMessages){
        Object.keys(action.payload.directMessages).forEach((key) => {
          if (nextState[key]){
            nextState[key].messages = nextState[key].messages.concat(
              action.payload.directMessages[key].messages
            ).sort();
            nextState[key].unreadCount =
              action.payload.directMessages[key].unreadCount;
          } else {
            nextState[key] = action.payload.directMessages[key];
          }
        });
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
