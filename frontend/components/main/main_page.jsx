import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React from 'react';
import { logout, fetchSessionPayload, forceLogout } from '../../actions/session_actions';
import { submitMessage, fetchMessage } from '../../actions/messages_actions';
import ActionCableManager from '../../actioncable/action_cable_manager';
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
        <div className={`loading-page
            ${this.props.sessionPayloadReceived ? "loaded" : "loading"}`}>
          <video loop autoPlay>
            <source
              src={window.staticImages.loaderVid1}
              type="video/webm">
            </source>
            <source
              src={window.staticImages.loaderVid1}
              type="video/mp4">
            </source>
          </video>
          <div>
            {this.props.sessionPayloadReceived ? "READY" : "CONNECTING"}
          </div>
        </div>
        <button className='logoutButton' onClick={this.props.logout}>logout</button>
        <LiveChat />
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
    submitMessage: (data) => dispatch(submitMessage(data)),
    subMethods: {
      fetchSessionPayload: () => dispatch(fetchSessionPayload()),
      fetchMessage: (id) => dispatch(fetchMessage(id)),
      forceLogout: (disconnect) => dispatch(forceLogout(disconnect))
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainPage)
);
