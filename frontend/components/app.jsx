import React from 'react';
import {Switch} from 'react-router';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {AuthRoute, ProtectedRoute} from '../util/route_util';
import {toggleDropdown} from '../actions/ui_actions';
import SessionPage from './session/session_page';
import MainPage from './main/main_page';
import ModalContainer from './modal/modal_container';

const App = (props) => {
  return (
  <div id='app' onClick={props.removeDropdown}>
    <Switch>
      <AuthRoute path='/login' component={SessionPage}/>
      <AuthRoute path='/signup' component={SessionPage}/>
      <ProtectedRoute path='/' component={MainPage}/>
    </Switch>
    <ModalContainer/>
  </div>);
};

const mapDispatchToProps = (dispatch, ownState) => {
  return {
    removeDropdown: (e) => dispatch(toggleDropdown(false))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
