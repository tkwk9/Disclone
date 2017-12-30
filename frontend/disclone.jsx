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
  const store = configureStore();

  // ### TESTING ###
  window.store = store;
  // ### TESTING ###

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={ store }/>, root);
});
