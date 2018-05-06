import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React from 'react';
import * as MessagesUtil from '../../../../../util/messages_util';
import {fetchSnippet} from '../../../../../actions/messages_actions';
import {toggleDmRead} from '../../../../../actions/direct_messages_actions';
import {toggleChannelRead} from '../../../../../actions/channels_actions';
import MessagesWrapper from './messages_wrapper';
import TailNote from './tail_note';
import TextArea from './text_area';
import LiveChatHead from './live_chat_head';

class LiveChat extends React.Component {
  constructor(props){
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.processMessages = this.processMessages.bind(this);
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView();
  }

  componentDidMount() {
    if (this.props.unreadCount > 0) this.props.toggleRead(this.props.messageableId);
    setTimeout(() => this.scrollToBottom(), 0);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.unreadCount > 0)
      this.props.toggleRead(newProps.messageableId);
    if (newProps.type !== this.props.type ||
        newProps.messageableId !== this.props.messageableId){
      this.scrollToBottom();
    }
  }

  componentDidUpdate(prevProps) {
    // On same Page
    if (prevProps.type === this.props.type &&
        prevProps.messageableId === this.props.messageableId){
      // If tail has changed
      if (this.props.tailMessageId !== prevProps.tailMessageId) {
        this.scroller.scrollTop =
          (this.scroller.scrollHeight - this.prevScrollPos) +
            this.scroller.scrollTop;
      }
      // If head has changed
      if (this.props.headMessageId !== prevProps.headMessageId) {
        this.props.toggleRead(this.props.messageableId);
        // If we are scrolledAtBottom but messages have loaded
        if (this.scrolledAtBottom || Boolean(!prevProps.headMessageId)){
          this.scrollToBottom();
        }
      }
    } else { // new page
      this.props.toggleRead(this.props.messageableId);
      this.scrollToBottom();
    }
  }

  handleScroll(e) {
    this.prevScrollPos = this.scroller.scrollHeight;
    window.scrollDiv = e.target;
    this.scrolledAtBottom =
      (e.target.scrollTop >= (e.target.scrollHeight - e.target.offsetHeight));
    if ((e.target.scrollTop === 0) && !this.props.infReq && ! this.props.begOfMessage) {

      this.props.fetchSnippet({
        messageable_type: this.props.type,
        messageable_id: this.props.messageableId,
        msg_id: this.props.tailMessageId,
        req_count: 10
      });
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
              key={messagesArray[0].id}
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
          key={messagesArray[0].id}
          messages={messagesArray.reverse()}
          showDate={true}
        />
      );
    }
    return messagesWrappers.reverse();
  }


  render(){
    return (
      <div className={`live-chat ${isNaN(this.props.type) ? 'dm' : 'channel'}`}>
        <div onScroll={this.handleScroll}
          className="scrollable"
          ref={(el) => {this.scroller = el;}}>
          <div className="holder">
            <TailNote beginningMessage={this.props.begOfMessage} />
            {this.processMessages()}
            <div style={{ float:"left", clear: "both" }}
              ref={(el) => { this.messagesEnd = el; }}
            />
          </div>
        </div>
        <TextArea scrollToBottom={this.scrollToBottom}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const messages = {};
  const messageable = isNaN(state.ui.serverId)
    ? state.entities.directMessages[state.ui.messageableId]
    : state.entities.channels[state.ui.messageableId];
  const messagesArray = messageable.messages.sort((a,b) => a - b);
  messagesArray.forEach((id) => messages[id] = state.entities.messages[id]);
  const tailMessageId = messagesArray[0];
  const headMessageId = messagesArray[messagesArray.length - 1];
  const begOfMessage = (tailMessageId == messageable.firstMessageId) || messageable.messages.length === 0;
  return {
    type: state.ui.serverId,
    messages: messages,
    tailMessageId: tailMessageId,
    headMessageId: headMessageId,
    begOfMessage: begOfMessage,
    unreadCount: messageable.unreadCount,
    infReq: state.ui.infReq
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let toggleRead = isNaN(ownProps.type) ? toggleDmRead : toggleChannelRead;
  return {
    submitMessage: (data) => dispatch(submitMessage(data)),
    fetchSnippet: (data) => dispatch(fetchSnippet(data)),
    toggleRead: (messageableId) => dispatch(toggleRead(messageableId))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LiveChat)
);
