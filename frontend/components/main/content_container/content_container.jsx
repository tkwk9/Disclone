import React from 'react';
import LiveChat from './live_chat/live_chat';
import FriendsList from './friends_list/friends_list';
import FriendsListHead from './content_head/friends_list_head';

class ContentContainer extends React.Component {
  constructor(props){
    super(props);

    this.updateFriendsList = this.updateFriendsList.bind(this);

    this.state = {
      head: <FriendsListHead updateFriendList={this.updateFriendsList} />,
      content: <FriendsList />
    };
  }

  componentWillMount(){
    switch(this.props.mode) {
      case 'friends_list':
        this.setState({
          head: <FriendsListHead updateFriendList={this.updateFriendsList} />,
          content: <FriendsList friendsListMode={true}/>
        });
        break;
      case 'DM':
        this.setState({
          head: <div className="head"></div>,
          content:
            <LiveChat type='DM' messageableId={this.props.messageableId} />
        });
        break;
      default:
        this.setState({
          head: <div className="head"></div>,
          content:
            <LiveChat type={this.props.mode} messageableId={this.props.messageableId} />
        });
    }
  }

  componentWillReceiveProps(newProps){
    switch(newProps.mode) {
      case 'friends_list':
        this.setState({
          head: <FriendsListHead updateFriendList={this.updateFriendsList} />,
          content: <FriendsList friendsListMode={true}/>
        });
        break;
      case 'DM':
        this.setState({
          head: <div className="head"></div>,
          content:
            <LiveChat type='DM' messageableId={newProps.messageableId} />
        });
        break;
      default:
        this.setState({
          head: <div className="head"></div>,
          content:
            <LiveChat type={newProps.mode} messageableId={newProps.messageableId} />
        });
    }
  }

  updateFriendsList(mode) {
    return () => {
      this.setState({
        content: <FriendsList friendsListMode={mode} />
      });
    };
  }

  render(){
    return (
      <div className="content-container">
        {this.state.head}
        {this.state.content}
      </div>
    );
  }
}

export default ContentContainer;
