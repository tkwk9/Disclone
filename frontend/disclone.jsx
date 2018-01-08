import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import lodash from 'lodash';

import * as fa from './actions/friends_actions';

import * as sessionActions from './actions/session_actions';
import * as messagesActions from './actions/messages_actions';

import * as uiActions from './actions/ui_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  // ### TESTING ###
  window.store = store;
  window.deleteFriendship = (id) => fa.deleteFriendship(id)(store.dispatch);
  window.createFriendship = (id) => fa.createFriendship(id)(store.dispatch);
  window.toggleModalOn = () => store.dispatch(uiActions.toggleModal(true, undefined));
  // ### TESTING ###

  const root = document.getElementById('root');
  if (root){
    ReactDOM.render(<Root store={ store }/>, root);
  }
});
