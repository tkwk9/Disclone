

import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';

// ### TESTING ###
import * as sessionAPIUtil from './util/session_api_util';
window.sessionAPIUtil = sessionAPIUtil;
import * as sessionActions from './actions/session_actions';
window.sessionActions = sessionActions;
// ### TESTING ###

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  window.store = store;

  const root = document.getElementById('root');
  ReactDOM.render(<h1>Working</h1>, root);
});
