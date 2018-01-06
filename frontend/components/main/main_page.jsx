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
import LiveChat from './live_chat/live_chat';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.acm = new ActionCableManager(this.props.subMethods);
    window.sub = this.acm.subscribe();
  }

  render(){
    return (
      <div id="main-page">
        <LoadingScreen
          sessionPayloadReceived={this.props.sessionPayloadReceived} />
        <div className="main-nav"></div>
        <div className="sub-nav">
          <div className="head"></div>
          <div className="content">
            <button className='logoutButton' onClick={this.props.logout}>logout</button></div>
          <div className="footer"></div>
        </div>
        <div className="content-container">
          <div className="head"></div>
          <LiveChat />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownState) => {
  return {
    currentUser: state.session.currentUser,
    sessionPayloadReceived: state.ui.sessionPayloadReceived,
    messages: state.entities.messages,
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
