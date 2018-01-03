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
      action.payload.messages = processMessages(action.payload.messages);
      Object.keys(action.payload.messages).forEach((key) => {
        nextState[key] = action.payload.messages[key];
        // nextState[key].timestamp = new Date(nextState[key].timestamp);
        // console.log(nextState[key].timestamp);
        // nextState[key].timestamp = 'not working';
      });
      return nextState;
    case RECEIVE_SESSION_PAYLOAD:
      return processMessages(action.payload.messages) ?
        action.payload.messages : state;
    case RESET_STATE:
      return defaultState;
    case FORCE_LOGOUT:
      return defaultState;
    default:
      return state;
  }
};

const processMessages = (messages) => {
  Object.keys(messages).forEach((key) => {
    // messages[key].timestamp = new Date(messages[key].timestamp);
    messages[key].delta = timeDifference(messages[key].timestamp);
  });
  return messages;
};

const timeDifference = (time) => {
  let then = new Date(time);
  let now = new Date();
  let delta = parseInt((now-then)/1000);
  let deltaObject;
  if (delta < 60){
    deltaObject = ["s", delta];
  } else {
    delta = Math.floor(delta/60);
    if (delta < 60){
      deltaObject = ["m", delta];
    } else {
      delta = Math.floor(delta/60);
      if (delta < 24){
        deltaObject = ['h', delta];
      } else {
        deltaObject =
        ['d', then.getMonth()+1 + "/" + then.getDate() + "/" + (then.getYear() + 1900)];
      }
    }
  }
  return deltaObject;
};

export default messagesReducer;
