import React from 'react';
import ReactDOM from 'react-dom';

import * as sessionAPIUtil from './util/session_api_util';

window.sessionAPIUtil = sessionAPIUtil;

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<h1>Working</h1>, root);
});
