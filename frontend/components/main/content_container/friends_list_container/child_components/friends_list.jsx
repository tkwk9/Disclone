import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FriendSelector from './friend_selector';

const FriendsList = props => {
  return (
    <div className="friends-list">
      <div className='friends-table-header'>
        <div>NAME</div><div>STATUS</div>
      </div>
      <div className='scrollable'>
        <ul>
          {props.friendsList
            .filter(friend => friend.online || props.allSelected)
            .map(friend => <FriendSelector key={friend.id} friend={friend} />)}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const directMessages = Object.values(state.entities.directMessages)
    .reduce( (acc, dm) => {
      acc[dm.recipientId] = dm;
      return acc;
    }, {});
  const friendsList = state.session.currentUser.friendsList.map((id) => {
    let friend = state.entities.users[id];
    friend.dm = directMessages[friend.id];
    return friend;
  });
  return {
    friendsList: friendsList,
    allSelected: state.ui.friendsListMode === 'all'
  };
};

export default withRouter(
  connect(mapStateToProps, null)(FriendsList)
);
