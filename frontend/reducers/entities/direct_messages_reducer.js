import { RECEIVE_SESSION_PAYLOAD } from '../../actions/session_actions';

const defaultState = {

};

const directMessagesReducer = (state = defaultState, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type){
    case RECEIVE_SESSION_PAYLOAD:
      return action.payload.directMessages;
    default:
      return state;
  }
};

export default directMessagesReducer;
