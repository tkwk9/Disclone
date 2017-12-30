import * as APIUtil from './util/sessionAPIUtil';

export const RECEIVE_SESSION_PAYLOAD = 'RECEIVE_SESSION_PAYLOAD';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const signup = user => dispatch => {
  return APIUtil.signup(user).then( payload => {
    return dispatch(receiveSessionPayload(payload));
  }).fail( response => {
    return dispatch(receiveSessionErrors(response.responseJSON));
  });
};

export const login = user => dispatch => {
  return APIUtil.login(user).then( payload => {
    return dispatch(receiveSessionPayload(payload));
  }).fail( response => {
    return dispatch(receiveSessionErrors(response.responseJSON));
  });
};

export const receiveSessionPayload = payload => {
  return {
    type: RECEIVE_SESSION_PAYLOAD,
    payload
  };
};

export const receiveSessionErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  };
};
