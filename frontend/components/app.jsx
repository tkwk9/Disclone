import React from 'react';
import { Switch, Route } from 'react-router';
import { withRouter } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { toggleDropdown } from '../actions/ui_actions';
import ModalContainer from './modal/modal_container';
import SessionPage from './session/session_page';
import MainPage from './main/main_page';
import { connect } from 'react-redux';


// <div id='app' onClick={props.toggleDropdown}>
const App = (props) => {
  return (
    <div id='app' onClick={() => {
        if (props.dropdownMode !== undefined) {
          props.toggleDropdown();
        }
      }}>
        <Switch>
          <AuthRoute path='/login' component={ SessionPage } />
          <AuthRoute path='/signup' component={ SessionPage } />
          <ProtectedRoute path='/' component={ MainPage }/>
        </Switch>
        <ModalContainer />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    dropdownMode: state.ui.toggleMode
  };
};

const mapDispatchToProps = (dispatch, ownState) => {
  return {
    toggleDropdown: (e) => dispatch(toggleDropdown(false, undefined)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
