import * as APIUtil from '../util/servers_api_util';
import { toggleModal } from './ui_actions';

export const RECEIVE_SERVER = 'RECEIVE_SERVER';
export const REMOVE_SERVER = 'REMOVE_SERVER';
export const RECEIVE_SERVER_ERROR = 'RECEIVE_SERVER_ERROR';

export const fetchServer = (serverId, path) => dispatch => {
  return APIUtil.fetchServer(serverId).then( payload => {
    return dispatch(receiveServer(payload, path));
  });
};

export const updateServer = (serverId, name) => dispatch => {
  return APIUtil.updateServer(serverId, name).then( payload => {
    return dispatch(receiveServer(payload));
  });
};

export const deleteServer = (serverId, path) => dispatch => {
  return APIUtil.deleteServer(serverId).then( payload => {
    return dispatch(removeServer(payload, path));
  });
};

export const createServer = (name) => dispatch => {
  return APIUtil.createServer(name).then( payload => {
    dispatch(toggleModal(false, ""));
    return dispatch(receiveServer(payload));
  }).fail( response => {
    return dispatch(receiveServerError(response.responseJSON[0]));
  });
};

export const subscribeToServer = (serverId, userId) => dispatch => {
  return APIUtil.subscribeToServer(serverId, userId).then( payload => {
    dispatch(toggleModal(false, ""));
    return dispatch(receiveServer(payload));
  }).fail( response => {
    return dispatch(receiveServerError(response.responseJSON[0]));
  });
};
export const unsubscribeToServer = (serverId, userId) => dispatch => {
  return APIUtil.unsubscribeToServer(serverId, userId).then( payload => {
    dispatch(toggleModal(false, ""));
    return dispatch(removeServer(payload));
  }).fail( response => {
    return dispatch(receiveServerError(response.responseJSON[0]));
  });
};

export const receiveServerError = error => {
  return {
    type: RECEIVE_SERVER_ERROR,
    error
  };
};

export const receiveServer = (payload, path) => {
  return {
    type: RECEIVE_SERVER,
    payload,
    path
  };
};

export const removeServer = (payload, path) => {
  return {
    type: REMOVE_SERVER,
    payload,
    path
  };
};
