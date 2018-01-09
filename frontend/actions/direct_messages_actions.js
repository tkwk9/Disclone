import * as APIUtil from '../util/direct_messages_api_util';
import { toggleModal } from './ui_actions';

export const RECEIVE_DM = 'RECEIVE_DM';
export const REMOVE_DM = 'REMOVE_DM';
export const RECEIVE_DM_ERROR = 'RECEIVE_DM_ERROR';

export const fetchDm = (targetId, path)=> dispatch => {
  return APIUtil.fetchDm(targetId).then( payload => {
    return dispatch(receiveDm(payload, path));
  });
};

export const createDm = targetId => dispatch => {
  // return APIUtil.createDm(targetId);
  return APIUtil.createDm(targetId).then( payload => {
    dispatch(toggleModal(false, undefined));
    return dispatch(receiveDm(payload));
  }).fail( response => {
    return dispatch(receiveDmError(response.responseJSON[0]));
  });
};

export const toggleDmRead = directMessageId => dispatch => {
  return APIUtil.toggleRead(directMessageId).then( payload => {
    return dispatch(receiveDm(payload));
  });
};

export const unsubscribeDm = dmId => dispatch => {
  return APIUtil.unsubscribeDm(dmId).then( payload => {
    return dispatch(removeDm(payload));
  });
};

export const receiveDmError = error => {
  return {
    type: RECEIVE_DM_ERROR,
    error
  };
};

export const receiveDm = (payload, path) => {
  return {
    type: RECEIVE_DM,
    payload,
    path
  };
};

export const removeDm = payload => {
  return {
    type: REMOVE_DM,
    payload
  };
};
