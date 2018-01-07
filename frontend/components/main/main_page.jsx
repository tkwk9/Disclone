import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React from 'react';
import { logout } from '../../actions/session_actions';
import LoadingScreen from './loading_screen/loading_screen';
import ContentContainer from './content_container/content_container';
import SubNavContainer from './sub_nav_container/sub_nav_container';
import {processPath} from '../../util/route_util';
import ActionCableContainer from '../../actioncable/action_cable_container';


class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.contentContainer = <div></div>;
  }

  componentWillReceiveProps(newProps) {
    if (newProps.sessionPayloadReceived){
      this.updateComponents(newProps);
    }
  }

  updateComponents(newProps) {
    let pathArray = processPath(newProps.currentPath, newProps.dmList);
    if (newProps.currentPath !== pathArray[0]){
      newProps.history.push(pathArray[0]);
      return;
    }
    this.subNavContainer =
      <SubNavContainer
        mode={pathArray[1]} messageableId={pathArray[2]} />;
    this.contentContainer =
      <ContentContainer
        mode={pathArray[1]} messageableId={pathArray[2]} />;
  }

  render(){
    return (
      <div id="main-page">
        <ActionCableContainer />
        <LoadingScreen
          sessionPayloadReceived={this.props.sessionPayloadReceived} />
        <div className="main-nav"></div>
        {this.subNavContainer}
        {this.contentContainer}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    sessionPayloadReceived: state.ui.sessionPayloadReceived,
    messages: state.entities.messages,
    currentPath: ownProps.location.pathname,
    dmList: Object.keys(state.entities.directMessages),
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch, ownState) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainPage)
);
