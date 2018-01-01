import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React from 'react';
import { logout } from '../../actions/session_actions';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div id="main-page">
        <div
          className={`loading-page
            ${this.props.sessionPayloadReceived ? "loaded" : "loading"}`}
        >
          <video loop autoPlay>
            <source
              src="/assets/0bdc0497eb3a19e66f2b1e3d5741634c.webm"
              type="video/webm">
            </source>
            <source
              src="/assets/ffac5bb3fb919ce8bf7137d79e9defc9.mp4"
              type="video/mp4">
            </source>
          </video>
          <div>
            {this.props.sessionPayloadReceived ? "CONNECTED" : "CONNECTING"}
          </div>
        </div>
        <button onClick={this.props.logout}>logout</button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownState) => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    sessionPayloadReceived: state.ui.sessionPayloadReceived,
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
