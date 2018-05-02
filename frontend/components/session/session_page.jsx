import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {signup, login, receiveSessionErrors} from '../../actions/session_actions';
import {processErrors} from '../../util/misc_util';
import SessionForm from './session_form';
import React from 'react';

class SessionPage extends React.Component {
  constructor(props) {
    super(props);
    this.flashClass = 'auth-flash inv';
    this.backgroundClass = `background-${Math.floor(Math.random() * 5)}`;
  }

  componentWillReceiveProps(newProps) {
    if (this.props.type !== newProps.type) {
      this.backgroundClass = `background-${Math.floor(Math.random() * 5)}`;
      this.props.clearSessionErrors();
      this.flash();
    }
  }

  flash() {
    this.flashClass = 'auth-flash';
    this.forceUpdate(() => {
      this.flashClass = 'auth-flash inv';
      this.forceUpdate();
    });
  }

  render() {
    return (<div id="auth-page" className={this.backgroundClass}>
      <div className={this.flashClass}></div>
      <div className={`auth-inner ${this.props.type}`}>
        <div className="auth-brand">
          <div className="auth-logo"></div>
          <div className='auth-logo-name'></div>
        </div>
        <div className="auth-form-container">
          <SessionForm type={this.props.type} processForm={this.props.processForm} errors={this.props.errors}/>
        </div>
      </div>
      <div className="auth-copyright">
        All trademarks and copyrights on this site are owned by their respective owners.
      </div>
    </div>);
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    errors: processErrors(state.errors.session)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const type = ownProps.location.pathname.split('/')[1];
  const processForm = type === 'login' ? login : signup;
  return {
    processForm: (user) => dispatch(processForm(user)),
    clearSessionErrors: () => dispatch(receiveSessionErrors([])),
    type
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionPage));
