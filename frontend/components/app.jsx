import React from 'react';
import { Switch, Route } from 'react-router';
import { AuthRoute } from '../util/route_util';
import SessionPage from './session/session_page';

export default () => {
  return (
    <div id='app'>
        <Switch>
          <AuthRoute path='/login' component={ SessionPage } />
          <AuthRoute path='/signup' component={ SessionPage } />
        </Switch>
    </div>
  );
};
