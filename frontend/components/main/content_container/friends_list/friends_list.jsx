import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React from 'react';
import {createDm } from '../../../../actions/direct_messages_actions';
import {deleteFriendship, createFriendship } from '../../../../actions/friends_actions';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.switchDms = this.switchDms.bind(this);
    this.deleteFriendship = this.deleteFriendship.bind(this);

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
    return () => {
      this.props.deleteFriendship(id);
    };
  }

  render() {

    let friends = this.props.friendsList.map((friend) => {
      return (
        <li style={{display: "flex", flexDirection: 'row', marginBottom: '10px'}}key={friend.id}>
          <button onClick={this.switchDms(friend)} style={{marginRight: "5px", padding: "0 10px"}}>{friend.username}</button>
          <button onClick={this.deleteFriendship(friend.id)} style={{padding: "0 10px"}}>unfriend</button>
        </li>
      );
    });
    return (
      <div className="friends_list">
        <ul>
          {friends}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    friendsList: state.session.currentUser.friendsList.map((id) => {
      let friend = state.entities.users[id];
      friend.dm = Object.values(state.entities.directMessages).find((dm) => dm.recipientId === friend.id);
      return friend;
    })
  };
};

const mapDispatchToProps = (dispatch, ownState) => {
  return {
    createDm: (targetId) => dispatch(createDm(targetId)),
    deleteFriendship: (targetId) => dispatch(deleteFriendship(targetId)),
    createFriendship: (targetId) => dispatch(createFriendship(targetId))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FriendsList)
);
