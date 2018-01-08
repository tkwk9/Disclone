import React from 'react';
import { Switch, Route } from 'react-router';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import ModalContainer from './modal/modal_container';
import SessionPage from './session/session_page';
import MainPage from './main/main_page';

export default () => {
  return (
    <div id='app'>
        <Switch>
          <AuthRoute path='/login' component={ SessionPage } />
          <AuthRoute path='/signup' component={ SessionPage } />
          <ProtectedRoute path='/' component={ MainPage }/>
        </Switch>
        <ModalContainer />
    </div>
  );
};
