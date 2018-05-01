import * as APIUtil from '../util/api/friends_api_util';
import { toggleModal } from './ui_actions';

export const RECEIVE_FRIENDS_LIST = 'RECEIVE_FRIENDS_LIST';
export const RECEIVE_FRIENDS_ERROR = 'RECEIVE_FRIENDS_ERROR';

export const fetchFriendsList = targetId => dispatch => {
  return APIUtil.fetchFriendsList(targetId).then( payload => {
    return dispatch(receiveFriendList(payload));
  });
};

export const deleteFriendship = targetId => dispatch => {
  return APIUtil.deleteFriendship(targetId).then( payload => {
    return dispatch(receiveFriendList(payload));
  });
};

export const createFriendship = targetId => dispatch => {
  return APIUtil.createFriendship(targetId).then( payload => {
    dispatch(toggleModal(false, ""));
    return dispatch(receiveFriendList(payload));
  }).fail( response => {
    return dispatch(receiveFriendsError(response.responseJSON[0]));
  });
};

export const receiveFriendsError = error => {
  return {
    type: RECEIVE_FRIENDS_ERROR,
    error
  };
};

export const receiveFriendList = payload => {
  return {
    type: RECEIVE_FRIENDS_LIST,
    payload
  };
};
