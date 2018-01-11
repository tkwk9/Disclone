import * as APIUtil from '../util/messages_api_util';
import {toggleInfReq} from './ui_actions';

export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGE';

export const fetchMessage = (id, path) => dispatch => {
  return APIUtil.fetchMessage(id).then((payload) =>{
    return dispatch(receiveMessages(payload, path));
  }).fail((response)=> {

  });
};

export const fetchSnippet = snippet => dispatch => {
  dispatch(toggleInfReq(true));
  return APIUtil.fetchSnippet(snippet).then((payload) =>{
    dispatch(toggleInfReq(false));
    return dispatch(receiveMessages(payload));
  }).fail((response)=> {
    dispatch(toggleInfReq(false));
  });
};

export const submitMessage = data => dispatch => {
  return APIUtil.submitMessage(data).then((payload) =>{
    return dispatch(receiveMessages(payload));
  }).fail((response)=> {

  });
};

export const receiveMessages = (payload, path) => {
  return {
    type: RECEIVE_MESSAGES,
    payload,
    path
  };
};
