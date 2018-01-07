import * as APIUtil from '../util/direct_messages_api_util';

export const RECEIVE_DM = 'RECEIVE_DM';
export const REMOVE_DM = 'REMOVE_DM';

export const fetchDm = targetId => dispatch => {
  return APIUtil.fetchDm(targetId).then( payload => {
    return dispatch(receiveDm(payload));
  });
};

export const createDm = targetId => dispatch => {
  return APIUtil.createDm(targetId).then( payload => {
    return dispatch(receiveDm(payload));
  });
};

export const toggleDmRead = directMessageId => dispatch => {
  return APIUtil.toggleRead(directMessageId).then( payload => {
    return dispatch(receiveDm(payload));
  });
};

export const unsubscribeDm = targetId => dispatch => {
  return APIUtil.unsubscribeDm(targetId).then( payload => {
    return dispatch(removeDm(payload));
  });
};

export const receiveDm = payload => {
  return {
    type: RECEIVE_DM,
    payload
  };
};

export const removeDm = payload => {
  return {
    type: REMOVE_DM,
    payload
  };
};
