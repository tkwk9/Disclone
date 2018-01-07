import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React from 'react';
import { fetchUser } from '../../actions/users_actions';
import { logout, fetchSessionPayload, forceLogout } from '../../actions/session_actions';
import { fetchFriendsList } from '../../actions/friends_actions';
import { fetchDm } from '../../actions/direct_messages_actions';
import { fetchMessage } from '../../actions/messages_actions';
import ActionCableManager from '../../actioncable/action_cable_manager';
import LoadingScreen from './loading_screen/loading_screen';
import ContentContainer from './content_container/content_container';
import SubNavContainer from './sub_nav_container/sub_nav_container';
import {processPath} from '../../util/route_util';


class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.contentContainer = <div></div>;
  }

  componentWillMount() {
    this.acm = new ActionCableManager(this.props.subMethods);
    window.sub = this.acm.subscribe();

  }

  componentWillReceiveProps(newProps) {
    if (newProps.sessionPayloadReceived){
      let pathArray = processPath(newProps.currentPath, newProps.dmList);
      if (newProps.currentPath !== pathArray[0]){
        newProps.history.push(pathArray[0]);
        return;
      }
      this.subNavContainer =
        <SubNavContainer mode={pathArray[1]} code={pathArray[2]} />;
      this.contentContainer =
        <ContentContainer mode={pathArray[1]} code={pathArray[2]} />;
    }
  }

  render(){
    return (
      <div id="main-page">
        <LoadingScreen sessionPayloadReceived={this.props.sessionPayloadReceived} />
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
    logout: () => dispatch(logout()),
    subMethods: {
      fetchSessionPayload: () => dispatch(fetchSessionPayload()),
      fetchMessage: (id) => dispatch(fetchMessage(id)),
      fetchFriendsList: () => dispatch(fetchFriendsList()),
      fetchUser: (id) => dispatch(fetchUser(id)),
      fetchDm: (id) => dispatch(fetchDm(id)),
      forceLogout: (disconnect) => dispatch(forceLogout(disconnect))
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainPage)
);
