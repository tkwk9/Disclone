import React from 'react';
import {connect} from 'react-redux';
import LiveChat from './live_chat/live_chat';
import FriendsList from './friends_list/friends_list';
import MembersList from './members_list/members_list';
import FriendsListHead from './content_head/friends_list_head';
import LiveChatHead from './content_head/live_chat_head';

const ContentContainer = props => {
  let head, content, memberList;
  switch(props.serverId) {
    case 'friends_list':
      head = (<FriendsListHead />);
      content = (<FriendsList friendsListMode={true}/>);
      memberList = (<div></div>);
      break;
    case 'DM':
      head = (<LiveChatHead messageableId={props.messageableId} />);
      content = (<LiveChat type='DM' messageableId={props.messageableId} />);
      memberList = (<div></div>);
      break;
    default:
      head =  (<LiveChatHead messageableId={props.messageableId} />);
      content = (<LiveChat type={props.serverId} messageableId={props.messageableId} />);
      memberList = (<MembersList serverId={props.serverId} />);
  }

  return (
    <div className="content-container">
      {head}
      {content}
      {memberList}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    serverId: state.ui.serverId,
    messageableId: state.ui.messageableId
  };
};

export default connect(mapStateToProps, null)(ContentContainer);
