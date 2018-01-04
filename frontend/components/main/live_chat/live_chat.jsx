import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React from 'react';
import * as MessagesUtil from '../../../util/messages_util';
import {submitMessage, fetchSnippet} from '../../../actions/messages_actions';
import MessagesWrapper from './messages/messages_wrapper';

class LiveChat extends React.Component {
  constructor(props){
    super(props);
    // ### TESTING ###
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
    // ### TESTING ###
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.processMessages = this.processMessages.bind(this);

    this.infRequested = false;
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
    this.infRequested = false;
  }

  // componentWillReceiveProps(newProps) {
  //   if (Object.keys(this.props.messages).length !==
  //     Object.keys(newProps.messages).length){
  //     this.scrollToBottom();
  //   }
  // }

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
    this.handleScroll = this.handleScroll.bind(this);
  }

  processMessages() {
    let messages = Object.values(this.props.messages).reverse();
    let messagesWrappers = [];
    if (messages.length > 0){
      let messagesArray = [messages[0]];
      for (let i = 1; i < messages.length; i++){
        if (MessagesUtil.messagesShouldBreak(messages[i - 1], messages[i])){
          messagesWrappers.push(
            <MessagesWrapper
              key={i}
              messages={messagesArray.reverse()}
              showDate={MessagesUtil.showDate(messages[i - 1], messages[i])}
            />);
          messagesArray = [messages[i]];
        } else {
          messagesArray.push(messages[i]);
        }
      }
      messagesWrappers.push(
        <MessagesWrapper
          key={messages.length}
          messages={messagesArray.reverse()}
          showDate={true}
        />);
    }
    return messagesWrappers.reverse();
  }

  handleScroll(e) {
    if ((e.target.scrollTop === 0) && !this.infRequested) {
      this.props.fetchSnippet({
        messageable_type: this.state.messageable.messageable,
        messageable_id: this.state.messageable.id,
        id: Object.keys(this.props.messages)[0]
      });
      this.infRequested = true;
    }
  }

  render(){
    return (
      <div className="live-chat dm">
        <div onScroll={this.handleScroll} className="scrollable">
          {this.processMessages()}
          <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text" onChange={this.handleChange}
            value={this.state.message.content}
            placeholder="Message" />

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
    fetchSnippet: (data) => dispatch(fetchSnippet(data))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LiveChat)
);
