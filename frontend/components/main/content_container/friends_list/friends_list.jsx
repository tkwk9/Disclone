import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FriendSelector from './friend_selector';
import React from 'react';
import {
  createDm, receiveDm
} from '../../../../actions/direct_messages_actions';
import {
  deleteFriendship,
  createFriendship
} from '../../../../actions/friends_actions';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
  }

  switchDms(friend){
    return () => {
      if (friend.dm){
        this.props.history.push(`/@me/${friend.dm.id}`);
      } else {
        this.props.createDm(friend.id);
      }
    };
  }

  deleteFriendship(id){
    return (e) => {
      e.stopPropagation();
      this.props.deleteFriendship(id);
    };
  }

  render() {
    let friends = this.props.friendsList.filter(
      friend => {
        return friend.online || this.props.friendsListMode;
      }
    ).map((friend) => {
      let status = friend.online ? 'green' : 'red';
      return (
        <FriendSelector
          key={friend.id}
          switchDms={this.switchDms(friend)}
          deleteFriendship={this.deleteFriendship(friend.id)}
          friend={friend}
          status={status}
        />
      );
    });
    return (
      <div className="friends-list">
        <div className='friends-table-header'>
          <div>NAME</div><div>STATUS</div>
        </div>
        <div className='scrollable'>
          <ul>
            {friends}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let directMessages = Object.values(state.entities.directMessages);
  let friendsList = state.session.currentUser.friendsList.map((id) => {
    let friend = state.entities.users[id];
    friend.dm = directMessages.find((dm) => dm.recipientId === friend.id);
    return friend;
  });
  return {
    friendsList: friendsList
  };
};

const mapDispatchToProps = (dispatch, ownState) => {
  return {
    createDm: friendId => dispatch(createDm(friendId)),
    receiveDm: payload => dispatch(receiveDm(payload)),
    deleteFriendship: targetId => dispatch(deleteFriendship(targetId)),
    createFriendship: targetId => dispatch(createFriendship(targetId))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FriendsList)
);
