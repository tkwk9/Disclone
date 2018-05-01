import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  let store = window.currentUser
    ? configureStore({
      session: {
        currentUser: window.currentUser
      }
    })
    : configureStore();
  delete window.currentUser;
  ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
});
