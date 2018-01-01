import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

// ### TESTING ###
import * as sessionAPIUtil from './util/session_api_util';
window.sessionAPIUtil = sessionAPIUtil;
import * as sessionActions from './actions/session_actions';
window.sessionActions = sessionActions;
// ### TESTING ###

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  // ### ws methods ###
  window.respond = command => {
    switch (command){
      case 'fetch_session_payload':
        sessionActions.fetchSessionPayload()(store.dispatch);
        break;
      default:
        console.log(`Unknown Command Received ${command}`);
    }
  };

  // ### TESTING ###
  window.store = store;
  window.logout = sessionAPIUtil.logout;
  window.print_me = (string) => {
    console.log(string);
  };
  // ### TESTING ###

  const root = document.getElementById('root');
  if (root){
    ReactDOM.render(<Root store={ store }/>, root);
  }
});
