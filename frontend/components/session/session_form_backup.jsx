import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signup, login } from '../../actions/session_actions';
import React from 'react';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      {this.props.type}
    </div>);
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    errors: state.errors.session,
    type: ownProps.location.pathname.slice(1)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let processInput;
  switch(ownProps.location.pathname.slice(1)) {
    case 'login':
      processInput = login;
      break;
    case 'signup':
      processInput = signup;
      break;
    default:
      processInput = null;
  }
  return {
    processInput: (user) => dispatch(processInput(user))
  };
};



export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SessionForm)
);
