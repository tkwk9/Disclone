import React from 'react';
import {connect} from 'react-redux';
import LoadingScreen from './loading_screen/loading_screen';
import ActionCableContainer from '../../actioncable/action_cable_container';
import MainNavContainer from './main_nav_container/main_nav_container';
import SubNavContainer from './sub_nav_container/sub_nav_container';
import ContentContainer from './content_container/content_container';
import {withRouter} from 'react-router-dom';

const MainPage = props => {
  return (
    <div id="main-page">
      <ActionCableContainer />
      <LoadingScreen />
      <MainNavContainer />
      <SubNavContainer/>
      {props.sessionPayloadReceived ? <ContentContainer/> : <div></div>}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    sessionPayloadReceived: state.ui.sessionPayloadReceived,
  };
};

export default withRouter(connect(mapStateToProps, null)(MainPage));
