import React from 'react';
import {connect} from 'react-redux';
import LiveChatHead from './child_components/live_chat_head';
import LiveChat from './child_components/live_chat';
import MembersList from './child_components/members_list/members_list';

const LiveChatContainer = props => {
  return (
    <div className="content-container">
      <LiveChatHead
        type={props.serverId}
        target={props.target}
      />
      <LiveChat type={props.serverId}/>
      {isNaN(props.serverId) ? <div></div>
        : <MembersList serverId={props.serverId} />}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    serverId: state.ui.serverId,
    target: isNaN(state.ui.serverId)
      ? state.entities.users[state.entities.directMessages[state.ui.messageableId].recipientId]
      : state.entities.channels[state.ui.messageableId],
  };
};

export default connect(mapStateToProps, null)(LiveChatContainer);
