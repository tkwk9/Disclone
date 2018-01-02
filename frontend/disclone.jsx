import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

import * as sessionActions from './actions/session_actions';
import * as messagesActions from './actions/messages_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  // ### WE METHOD ###
  window.respond = ({ command, options })=> {
    switch (command){
      case 'fetch_session_payload':
        sessionActions.fetchSessionPayload()(store.dispatch);
        break;
      case 'fetch_message':
        messagesActions.fetchMessage(options.messageId)(store.dispatch);
        break;
      case 'print':
        console.log(options.message);
        break;
      default:
        console.log(`Unknown Command Received: ${command}`);
    }
  };

  // ### TESTING ###
  window.store = store;
  // ### TESTING ###

  const root = document.getElementById('root');
  if (root){
    ReactDOM.render(<Root store={ store }/>, root);
  }
});
