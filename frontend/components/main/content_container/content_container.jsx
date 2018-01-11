import React from 'react';
import LiveChat from './live_chat/live_chat';
import FriendsList from './friends_list/friends_list';
import MembersList from './members_list/members_list';
import FriendsListHead from './content_head/friends_list_head';
import LiveChatHead from './content_head/live_chat_head';

class ContentContainer extends React.Component {
  constructor(props){
    super(props);

    this.updateFriendsList = this.updateFriendsList.bind(this);

    this.state = {
      head: <FriendsListHead updateFriendList={this.updateFriendsList} />,
      content: <FriendsList />,
      memberList: <div></div>
    };
  }

  componentWillMount(){
    switch(this.props.mode) {
      case 'friends_list':
        this.setState({
          head: <FriendsListHead updateFriendList={this.updateFriendsList} friendsListMode={true} />,
          content: <FriendsList friendsListMode={true}/>,
          memberList: <div></div>

        });
        break;
      case 'DM':
        this.setState({
          head: <LiveChatHead type='DM' messageableId={this.props.messageableId} />,
          content:
            <LiveChat type='DM' messageableId={this.props.messageableId} />,
          memberList: <div></div>

        });
        break;
      default:
        this.setState({
          head: <LiveChatHead type={this.props.mode} messageableId={this.props.messageableId} />,
          content:
            <LiveChat type={this.props.mode} messageableId={this.props.messageableId} />,
          memberList:<MembersList serverId={this.props.mode} />

        });
    }
  }

  componentWillReceiveProps(newProps){
    switch(newProps.mode) {
      case 'friends_list':
        this.setState({
          head: <FriendsListHead updateFriendList={this.updateFriendsList} friendsListMode={true}/>,
          content: <FriendsList friendsListMode={true}/>,
          memberList: <div></div>

        });
        break;
      case 'DM':
        this.setState({
          head: <LiveChatHead type='DM' messageableId={newProps.messageableId} />,
          content:
            <LiveChat type='DM' messageableId={newProps.messageableId} />,
          memberList: <div></div>

        });
        break;
      default:
        this.setState({
          head: <LiveChatHead type={newProps.mode} messageableId={newProps.messageableId} />,
          content:
            <LiveChat type={newProps.mode} messageableId={newProps.messageableId} />,
          memberList: <MembersList serverId={newProps.mode} />// pass props server id

        });
    }
  }

  updateFriendsList(mode) {
    return () => {
      console.log(mode);
      this.setState({
        head: <FriendsListHead updateFriendList={this.updateFriendsList} friendsListMode={mode}/>,
        content: <FriendsList friendsListMode={mode} />
      });
    };
  }

  render(){
    return (
      <div className="content-container">
        {this.state.head}
        {this.state.content}
        {this.state.memberList}
      </div>
    );
  }
}

export default ContentContainer;
