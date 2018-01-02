import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RESET_STATE = 'RESET_STATE';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const RECEIVE_SESSION_PAYLOAD = 'RECEIVE_SESSION_PAYLOAD';

export const signup = user => dispatch => {
  return APIUtil.signup(user).then( currentUser => {
    return dispatch(receiveCurrentUser(currentUser));
  }).fail( response => {
    return dispatch(receiveSessionErrors(response.responseJSON));
  });
};

export const login = user => dispatch => {
  return APIUtil.login(user).then( currentUser => {
    return dispatch(receiveCurrentUser(currentUser));
  }).fail( response => {
    return dispatch(receiveSessionErrors(response.responseJSON));
  });
};

export const logout = () => dispatch => {
  return APIUtil.logout().then(() => {
    return dispatch(resetState());
  });
};

export const fetchSessionPayload = () => dispatch => {
  return APIUtil.fetchSessionPayload().then( payload => {
    return dispatch(receiveSessionPayload(payload));
  }).fail( response => {
    return dispatch(receiveSessionErrors(response.responseJSON));
  });
};

export const receiveCurrentUser = currentUser => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  };
};

export const resetState = () => {
  return {
    type: RESET_STATE
  };
};

export const receiveSessionPayload = payload => {
  return{
    type: RECEIVE_SESSION_PAYLOAD,
    payload
  };
};

export const receiveSessionErrors = errors => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  };
};
