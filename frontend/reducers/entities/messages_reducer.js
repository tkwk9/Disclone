import { RECEIVE_SESSION_PAYLOAD } from '../../actions/session_actions';

const defaultState = {

};

const messagesReducer = (state = defaultState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type){
    case RECEIVE_SESSION_PAYLOAD:
      return action.payload.messages
    default:
      return state;
  }
};

export default messagesReducer;
