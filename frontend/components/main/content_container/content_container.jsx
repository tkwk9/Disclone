import React from 'react';
import {connect} from 'react-redux';
import FriendsListContainer from './friends_list_container/friends_list_container';
import LiveChatContainer from './live_chat_container/live_chat_container';

const ContentContainer = props => {
  return props.serverId === 'friends_list' ? <FriendsListContainer /> : <LiveChatContainer />;
};

const mapStateToProps = (state, ownProps) => {
  return {
    serverId: state.ui.serverId,
  };
};

export default connect(mapStateToProps, null)(ContentContainer);
