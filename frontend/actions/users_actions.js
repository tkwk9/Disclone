import * as APIUtil from '../util/users_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';

export const fetchUser = (id) => dispatch => {
  return APIUtil.fetchUser(id).then( user => {
    return dispatch(receiveUser(Object.values(user)[0]));
  });
};

export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user
  };
};
