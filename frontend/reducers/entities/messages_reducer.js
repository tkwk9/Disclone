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
    deltaObject = letThereBeDeltaObject("s", delta, then);
  } else {
    delta = Math.floor(delta/60);
    if (delta < 60){
      deltaObject = letThereBeDeltaObject("m", delta, then);
    } else {
      delta = Math.floor(delta/60);
      if (delta < 24){
        deltaObject = letThereBeDeltaObject("h", delta, then);
      } else {
        delta = Math.floor(delta/24);
        deltaObject = letThereBeDeltaObject("d", delta, then);
      }
    }
  }
  return deltaObject;
};

const letThereBeDeltaObject = (type, delta, time) => {
  return {
    type,
    delta,
    date: formatDate(time),
    time: formatTime(time)
  };
};

const formatDate = (time) => {
  return time.getMonth()+1 + "/" +
    time.getDate() + "/" +
    (time.getYear() + 1900);
};

const formatTime = (time) => {
  let meridiem = ' AM';
  let hour = time.getHours();
  if (hour > 12) {
    hour = hour - 12;
    meridiem = ' PM';
  }
  return ("0" + hour).slice(-2) + ":" +
    ("0" + time.getMinutes()).slice(-2) + 
    meridiem;
};

export default messagesReducer;
