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
      <div>
        <button onClick={this.props.logout}>logout</button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownState) => {
  return {
    loggedIn: Boolean(state.session.currentUser),
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
