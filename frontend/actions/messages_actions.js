import * as APIUtil from '../util/messages_api_util';

export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGE';

export const fetchMessage = id => dispatch => {
  return APIUtil.fetchMessage(id).then((payload) =>{
    return dispatch(receiveMessages(payload));
  }).fail((response)=> {

  });
};

export const submitMessage = data => dispatch => {
  return APIUtil.submitMessage(data).then((payload) =>{
    return dispatch(receiveMessages(payload));
  }).fail((response)=> {

  });
};

export const receiveMessages = payload => {
  return {
    type: RECEIVE_MESSAGES,
    payload
  };
};
