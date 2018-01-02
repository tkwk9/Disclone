import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React from 'react';
import { logout } from '../../actions/session_actions';
import { submitMessage } from '../../actions/messages_actions';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div id="main-page">
        <div className={`loading-page
            ${this.props.sessionPayloadReceived ? "loaded" : "loading"}`}>
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
        <button className='logoutButton' onClick={this.props.logout}>logout</button>
        <LiveChat messages={this.props.messages} currentUser={this.props.currentUser} submitMessage={this.props.submitMessage}/>
      </div>
    );
  }
}

class LiveChat extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      message: {
        author_id: props.currentUser.id,
        content: ""
      },
      messageable: {
        messageable: 'DM',
        id: 1
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: {
        author_id: this.props.currentUser.id,
        content: e.target.value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submitMessage(this.state);
    this.setState({
      message: {
        author_id: this.props.currentUser.id,
        content: ""
      }
    });
  }

  render(){
    return (
      <div className="chat">
        <div className="scrollable">
          {Object.values(this.props.messages).map((message) => <li key={message.id}><span className='author'>{message.author}:</span> <span className='timestamp'>({message.timestamp})</span> {message.content}</li>).reverse()}

        </div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} value={this.state.message.content}>
          </input>
          <button className="tempButton" type='submit'>send message</button>
        </form>
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
    submitMessage: (data) => dispatch(submitMessage(data))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainPage)
);
