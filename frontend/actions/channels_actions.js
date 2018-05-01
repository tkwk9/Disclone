import * as APIUtil from '../util/api/channels_api_util';
import { toggleModal } from './ui_actions';

export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
export const RECEIVE_CHANNEL_ERROR = 'RECEIVE_CHANNEL_ERROR';

export const fetchChannel = (channelId, path) => dispatch => {
  return APIUtil.fetchChannel(channelId).then( payload => {
    return dispatch(receiveChannel(payload, path));
  });
};

export const toggleChannelRead = directMessageId => dispatch => {
  return APIUtil.toggleRead(directMessageId).then( payload => {
    return dispatch(receiveChannel(payload));
  });
};

export const updateChannel = (channelId, name) => dispatch => {
  return APIUtil.updateChannel(channelId, name).then( payload => {
    dispatch(toggleModal(false, ""));
    return dispatch(receiveChannel(payload));
  });
};

export const deleteChannel = (channelId, path) => dispatch => {
  return APIUtil.deleteChannel(channelId).then( payload => {
    return dispatch(removeChannel(payload, path));
  });
};

export const createChannel = (serverId, name) => dispatch => {
  return APIUtil.createChannel(serverId, name).then( payload => {
    dispatch(toggleModal(false, ""));
    return dispatch(receiveChannel(payload));
  }).fail( response => {
    return dispatch(receiveChannelError(response.responseJSON[0]));
  });
};

export const receiveChannelError = error => {
  return {
    type: RECEIVE_CHANNEL_ERROR,
    error
  };
};
export const removeChannel = (payload, path) => {
  return {
    type: REMOVE_CHANNEL,
    payload,
    path
  };
};

export const receiveChannel = (payload, path) => {
  return {
    type: RECEIVE_CHANNEL,
    payload,
    path
  };
};
