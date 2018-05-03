import React from 'react';
import {connect} from 'react-redux';
import LiveChat from './live_chat/live_chat';
import FriendsList from './friends_list/friends_list';
import MembersList from './members_list/members_list';
import FriendsListHead from './content_head/friends_list_head';
import LiveChatHead from './content_head/live_chat_head';

class ContentContainer extends React.Component {
  constructor(props){
    super(props);

    this.updateFriendsList = this.updateFriendsList.bind(this);
  }

  updateFriendsList(mode) {
    return () => {
      this.setState({
        head: <FriendsListHead updateFriendList={this.updateFriendsList} friendsListMode={mode}/>,
        content: <FriendsList friendsListMode={mode} />
      });
    };
  }

  render(){
    let head, content, memberList;
    switch(this.props.serverId) {
      case 'friends_list':
        head = (<FriendsListHead updateFriendList={this.updateFriendsList} />);
        content = (<FriendsList friendsListMode={true}/>);
        memberList = (<div></div>);
        break;
      case 'DM':
        head = (<LiveChatHead type='DM' messageableId={this.props.messageableId} />);
        content = (<LiveChat type='DM' messageableId={this.props.messageableId} />);
        memberList = (<div></div>);
        break;
      default:
        head =  (<LiveChatHead type={this.props.serverId} messageableId={this.props.messageableId} />);
        content = (<LiveChat type={this.props.serverId} messageableId={this.props.messageableId} />);
        memberList = (<MembersList serverId={this.props.serverId} />);
    }

    return (
      <div className="content-container">
        {head}
        {content}
        {memberList}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    serverId: state.ui.serverId,
    messageableId: state.ui.messageableId
  };
};

export default connect(mapStateToProps, null)(ContentContainer);
