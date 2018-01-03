import {
  RECEIVE_SESSION_PAYLOAD,
  RESET_STATE,
  FORCE_LOGOUT
} from '../../actions/session_actions';
import { RECEIVE_MESSAGES } from '../../actions/messages_actions';

const defaultState = {

};

const messagesReducer = (state = defaultState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type){
    case RECEIVE_MESSAGES:
      Object.keys(action.payload.messages).forEach((key) => {
        nextState[key] = action.payload.messages[key];
      });
      return nextState;
    case RECEIVE_SESSION_PAYLOAD:
      return action.payload.messages ?
        action.payload.messages : state;
    case RESET_STATE:
      return defaultState;
    case FORCE_LOGOUT:
      return defaultState;
    default:
      return state;
  }
};

export default messagesReducer;
