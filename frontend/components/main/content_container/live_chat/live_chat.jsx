import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React from 'react';
import * as MessagesUtil from '../../../../util/messages_util';
import {
  submitMessage, fetchSnippet
} from '../../../../actions/messages_actions';
// TODO: Import toggleChannelRead
import {toggleDmRead} from '../../../../actions/direct_messages_actions';
import MessagesWrapper from './messages/messages_wrapper';

class LiveChat extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      message: {
        author_id: props.currentUser.id,
        content: ""
      },
      messageable: {
        messageable: props.type,
        id: props.messageableId
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.processMessages = this.processMessages.bind(this);
    this.infRequested = false;
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView();
  }

  componentDidMount() {
    // TODO: REFACTOR FOR CHANNELS
    if (this.props.type === 'DM' && this.props.unreadCount > 0){
      this.props.toggleRead(this.props.messageableId);
    }
    setTimeout(() => {
      this.scrollToBottom();
    }, 0);
  }

  componentWillReceiveProps(newProps) {
    // TODO: REFACTOR FOR CHANNELS
    if (newProps.type === 'DM' && newProps.unreadCount > 0){
      this.props.toggleRead(newProps.messageableId);
    }
    if (newProps.type !== this.props.type ||
        newProps.messageableId !== this.props.messageableId){
      this.scrollToBottom();
      this.setState({
        message: {
          author_id: newProps.currentUser.id,
          content: ""
        },
        messageable: {
          messageable: newProps.type,
          id: newProps.messageableId
        }
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type === this.props.type &&
        prevProps.messageableId === this.props.messageableId){
      // If tail has changed
      if (this.props.tailMessageId !== prevProps.tailMessageId) {
        this.infRequested = false;
        this.scroller.scrollTop =
          (this.scroller.scrollHeight - this.prevScrollPos) +
            this.scroller.scrollTop;
      }
      // If head has changed
      if (this.props.headMessageId !== prevProps.headMessageId) {
        // If we are scrolledAtBottom but messages have loaded
        if (this.scrolledAtBottom || Boolean(!prevProps.headMessageId)){
          this.scrollToBottom();
        }
      }
    } else {
      this.scrollToBottom();
    }
  }

  handleInputChange(e) {
    this.setState({
      message: {
        author_id: this.props.currentUser.id,
        content: e.target.value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.scrollToBottom();
    this.props.submitMessage(this.state);
    this.setState({
      message: {
        author_id: this.props.currentUser.id,
        content: ""
      }
    });
  }

  handleScroll(e) {
    this.prevScrollPos = this.scroller.scrollHeight;
    window.scrollDiv = e.target;
    this.scrolledAtBottom =
      (e.target.scrollTop >= (e.target.scrollHeight - e.target.offsetHeight));

    if ((e.target.scrollTop === 0) && !this.infRequested) {

      this.props.fetchSnippet({
        messageable_type: this.props.type,
        messageable_id: this.props.messageableId,
        msg_id: this.props.tailMessageId,
        req_count: 10
      });

      this.infRequested = true;
    }
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
        />
      );
    }
    return messagesWrappers.reverse();
  }


  render(){
    return (
      <div className="live-chat dm">
        <div onScroll={this.handleScroll}
          className="scrollable"
          ref={(el) => {this.scroller = el;}}>
          <div className="holder">
            {this.processMessages()}
            <div style={{ float:"left", clear: "both" }}
              ref={(el) => { this.messagesEnd = el; }}
            />
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text" onChange={this.handleInputChange}
            value={this.state.message.content}
            placeholder={`Message ${this.props.placeholderText}`}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let messages = {};
  let messageable;
  let messagesArray;
  let placeholderText;
  if (ownProps.type === 'DM'){
    messageable = state.entities.directMessages[ownProps.messageableId];
    placeholderText =
      `@${state.entities.users[messageable.recipientId].username}`;
    messagesArray = messageable.messages;
  } else {
    // TODO: Handle Channel
  }
  messagesArray.forEach((id) => {
    messages[id] = state.entities.messages[id];
  });
  let tailMessageId = messagesArray[0];
  let headMessageId = messagesArray[messages.length - 1];

  return {
    currentUser: state.session.currentUser,
    messages: messages,
    tailMessageId: tailMessageId,
    headMessageId: headMessageId,
    unreadCount: messageable.unreadCount,
    recipientId: messageable.recipientId,
    placeholderText: placeholderText,
    currentPath: ownProps.location.pathname
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let toggleRead;
  if (ownProps.type === 'DM'){
    toggleRead = toggleDmRead;
  } else {
    // TODO: swap toggles based on ownProps.type
  }
  return {
    submitMessage: (data) => dispatch(submitMessage(data)),
    fetchSnippet: (data) => dispatch(fetchSnippet(data)),
    toggleRead: (directMessageId) => dispatch(toggleRead(directMessageId))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LiveChat)
);
