import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React from 'react';
import * as MessagesUtil from '../../../util/messages_util';
import {submitMessage} from '../../../actions/messages_actions';

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
    messages: state.entities.messages
  };
};

const mapDispatchToProps = (dispatch, ownState) => {
  return {
    submitMessage: (data) => dispatch(submitMessage(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LiveChat)
);
