import React from 'react';
import SessionInputGroup from './session_input_group';
import {Link} from 'react-router-dom';
import {processErrors} from '../../util/misc_util';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      email: "",
      username: "",
      password: ""
    };
    this.state = this.defaultState;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.loginAsGuest = this.loginAsGuest.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.type !== this.props.type)
      this.setState(this.defaultState);
    }

  handleInputChange(mode) {
    return(e) => {
      this.setState({[mode]: e.currentTarget.value});
    };
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state);
  }

  loginAsGuest(e) {
    e.preventDefault();
    this.setState({
      email: "guest1@gmail.com",
      password: "password"
    }, autoSubmitForm);

    function autoSubmitForm() {
      setTimeout(() => {
        this.props.processForm(this.state);
      }, 500);
    }
  }

  render() {
    switch (this.props.type) {
      case 'signup':
        return this.getSignupForm();
      case 'login':
        return this.getLoginForm();
    }
  }

  getLoginForm() {
    return (<form onSubmit={this.handleFormSubmit} className='auth-form'>
      <h1>WELCOME BACK!</h1>

      <SessionInputGroup
        className={this.props.errors.email.className}
        errorMessage={this.props.errors.email.errorMessage}
        onChange={this.handleInputChange('email')}
        type='email'
        inputType='text'
        value={this.state.email}
      />
      <SessionInputGroup
        className={this.props.errors.password.className}
        errorMessage={this.props.errors.password.errorMessage}
        onChange={this.handleInputChange('password')}
        type='password'
        inputType='password'
        value={this.state.password}
      />
      <div className='gap'></div>

      <button type="submit" name="button">Login</button>
      <div className="footer">
        Need an account? <Link to="/signup">Register</Link> or <a onClick={this.loginAsGuest}>Login as Guest</a>
      </div>
    </form>);
  }

  getSignupForm() {
    return (<form onSubmit={this.handleFormSubmit} className='auth-form'>
      <h1>CREATE AN ACCOUNT</h1>

      <SessionInputGroup
        className={this.props.errors.email.className}
        errorMessage={this.props.errors.email.errorMessage}
        onChange={this.handleInputChange('email')}
        type='email'
        inputType='text'
        value={this.state.email}
      />
      <SessionInputGroup
        className={this.props.errors.username.className}
        errorMessage={this.props.errors.username.errorMessage}
        onChange={this.handleInputChange('username')}
        type='username'
        inputType='text'
        value={this.state.username}
      />
      <SessionInputGroup
        className={this.props.errors.password.className}
        errorMessage={this.props.errors.password.errorMessage}
        onChange={this.handleInputChange('password')}
        type='password'
        inputType='password'
        value={this.state.password}
      />

      <button type="submit" name="button">Continue</button>
      <div className="disclaimer">
        By registering, you are not necessarily agree to
        Disclone's Terms of Services and Privacy Policy.
      </div>
      <div className="divider"></div>
      <div className="footer">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </form>);
  }
}

export default SessionForm;
