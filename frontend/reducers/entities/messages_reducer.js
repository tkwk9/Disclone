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
import * as MessagesUtil from '../../util/messages_util';
import lodash from 'lodash';

const defaultState = {

};

const messagesReducer = (state = defaultState, action) => {
  let nextState = lodash.merge({}, state);
  switch (action.type){
    case RECEIVE_MESSAGES:
      action.payload.messages = MessagesUtil.processMessages(action.payload.messages);
      Object.keys(action.payload.messages).forEach((key) => {
        nextState[key] = action.payload.messages[key];
      });
      return nextState;
    case RECEIVE_SESSION_PAYLOAD:
      return MessagesUtil.processMessages(action.payload.messages) ?
        action.payload.messages : state;
    case RECEIVE_DM:
      if (action.payload.messages) {
        action.payload.messages = MessagesUtil.processMessages(action.payload.messages);
        Object.keys(action.payload.messages).forEach((key) => {
          nextState[key] = action.payload.messages[key];
        });
      }
      return nextState;
    case REMOVE_DM:
      // Object.keys(action.payload.messages).forEach((key) => {
      //   delete nextState[key];
      // });
      return nextState;
    case RESET_STATE:
      return defaultState;
    case FORCE_LOGOUT:
      return defaultState;
    default:
      return state;
  }
};


export default messagesReducer;
