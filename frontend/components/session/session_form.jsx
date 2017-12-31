import React from 'react';
import SessionInputGroup from './session_input_group';
import { Link } from 'react-router-dom';
import { processErrors } from '../../util/misc_util';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.loginAsGuest = this.loginAsGuest.bind(this);
  }

  componentWillReceiveProps(newProps){
    if (newProps.type !== this.props.type) {
      this.setState(
        {
          email: "",
          username: "",
          password: ""
        }
      );
    }
  }

  handleInputChange(mode){
    return (e) => {
      this.setState(
        {
          [mode]: e.currentTarget.value
        }
      );
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
    }, () => {
      setTimeout(() => {
        this.props.processForm(this.state);
      }, 500);
    });
  }

  render() {
    let errors = processErrors(this.props.errors);
    if (this.props.type === 'signup'){
      return (
        <form onSubmit={this.handleFormSubmit} className='auth-form'>
          <h1>CREATE AN ACCOUNT</h1>

          <SessionInputGroup
            className={errors.email.className}
            errorMessage={errors.email.errorMessage}
            onChange={this.handleInputChange('email')}
            type='email'
            inputType='text'
            value={this.state.email}
          />
          <SessionInputGroup
            className={errors.username.className}
            errorMessage={errors.username.errorMessage}
            onChange={this.handleInputChange('username')}
            type='username'
            inputType='text'
            value={this.state.username}
          />
          <SessionInputGroup
            className={errors.password.className}
            errorMessage={errors.password.errorMessage}
            onChange={this.handleInputChange('password')}
            type='password'
            inputType='password'
            value={this.state.password}
          />

          <button type="submit" name="button">Continue</button>
          <div className="disclaimer">
            By registering, you agree to Disclone's <Link to="">
            Terms of Services
          </Link> and <Link to="">Privacy Policy.</Link>
          </div>
          <div className="divider">

          </div>
          <div className="footer">
            Already have an account? <Link to="/login">
            Login</Link>
          </div>
        </form>
      );
    } else {
      return (
        <form onSubmit={this.handleFormSubmit} className='auth-form'>
          <h1>WELCOME BACK!</h1>

          <SessionInputGroup
            className={errors.email.className}
            errorMessage={errors.email.errorMessage}
            onChange={this.handleInputChange('email')}
            type='email'
            inputType='text'
            value={this.state.email}
          />
          <SessionInputGroup
            className={errors.password.className}
            errorMessage={errors.password.errorMessage}
            onChange={this.handleInputChange('password')}
            type='password'
            inputType='password'
            forgotPassword={true}
            value={this.state.password}
          />

          <button type="submit" name="button">Login</button>
            <div className="footer">
                Need an account? <Link to="/signup">
                Regster</Link> or <a onClick={this.loginAsGuest}>
                Login as Guest</a>
            </div>
        </form>
      );
    }
  }
}

export default SessionForm;
