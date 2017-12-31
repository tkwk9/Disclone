import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signup, login } from '../../actions/session_actions';
import SessionForm from './session_form';
import React from 'react';

class SessionPage extends React.Component {
  constructor(props) {
    super(props);
    this.flashClass = 'auth-flash inv';
  }

  componentWillReceiveProps(newProps){
    if (this.props.type !== newProps.type){
      this.flashClass = 'auth-flash';
      this.forceUpdate(() => {
        this.flashClass = 'auth-flash inv';
        this.forceUpdate();
      });
    }
  }

  render() {
    return (<div id="auth-page">
      <div className={this.flashClass}></div>
      <div className={`auth-inner ${this.props.type}`}>
        <div className="auth-brand">
          <div className="auth-logo"></div>
          <div className='auth-logo-name'></div>
        </div>
        <div className="auth-form-container">
          <SessionForm
            type={this.props.type}
            processForm={this.props.processForm}
            errors={this.props.errors}
          />
        </div>
      </div>
      <div className="auth-copyright">
        All trademarks and copyrights on this
        site are owned by their respective owners.
      </div>
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
  let processForm;
  switch(ownProps.location.pathname.slice(1)) {
    case 'login':
      processForm = login;
      break;
    case 'signup':
      processForm = signup;
      break;
    default:
      processForm = null;
  }
  return {
    processForm: (user) => dispatch(processForm(user))
  };
};



export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SessionPage)
);
