import * as APIUtil from '../util/friends_api_util';

export const RECEIVE_FRIENDS_LIST = 'RECEIVE_FRIENDS_LIST';

export const fetchFriendsList = targetId => dispatch => {
  return APIUtil.fetchFriendsList(targetId).then( payload => {
    return dispatch(receiveFriendList(payload));
  });
};

export const deleteFriendship = targetId => dispatch => {
  return APIUtil.deleteFriendship(targetId).then( payload => {
    return dispatch(receiveFriendList);
  });
};

export const createFriendship = targetId => dispatch => {
  return APIUtil.createFriendship(targetId).then( payload => {
    return dispatch(receiveFriendList);
  });
};

export const receiveFriendList = payload => {
  return {
    type: RECEIVE_FRIENDS_LIST,
    payload
  };
};
