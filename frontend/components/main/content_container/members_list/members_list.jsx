import React from 'react';
import { logout } from '../../../../actions/session_actions';
import { withRouter, NavLink } from 'react-router-dom';
import {
  createDm, receiveDm
} from '../../../../actions/direct_messages_actions';
import { unsubscribeDm } from '../../../../actions/direct_messages_actions';
import { unsubscribeToServer } from '../../../../actions/servers_actions';
import { connect } from 'react-redux';
import * as svg from '../../../../util/svg';

class MembersList extends React.Component {
  constructor(props){
    super(props);
    this.switchDms = this.switchDms.bind(this);
    this.removeDm = this.removeDm.bind(this);
    this.redirectToFriendList = this.redirectToFriendList.bind(this);
  }

  switchDms(member){
    return () => {
      if (member.dm){
        this.props.history.push(`/@me/${member.dm.id}`);
      } else {
        this.props.createDm(member.id);
        // this.props.createDm(friend.id).then(this.props.receiveDm).then();
      }
    };
  }

  removeDm(dmId){
    return (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.props.currentPath === `/@me/${dmId}`){
        this.props.history.push(`/@me`);
      }
      this.props.unsubscribeDm(dmId);
    };
  }

  redirectToFriendList() {
    this.props.history.push('/@me');
  }

  render() {

    let onlineList = [];
    let offlineList = [];

    this.props.membersList.forEach ((member) => {
      if (member.online) {
        onlineList.push(
          <div className='member-selector member-list-selectable' key={member.id} onClick={this.switchDms(member)}>
            <div className='user-img'>
              <div className='image-holder'>
                <img src={member.imgURL}></img>
              </div>
              <div className={`status-indicator ${member.online}`}></div>
            </div>
            <div  className='channel-name'>{member.username}</div>
          </div>
        );
      } else {
        offlineList.push(
          <div className='member-selector member-list-selectable' key={member.id} onClick={this.switchDms(member)}>
            <div className='user-img'>
              <div className='image-holder'>
                <img src={member.imgURL}></img>
              </div>
              <div className={`status-indicator ${member.online}`}></div>
            </div>
            <div  className='channel-name'>{member.username}</div>
          </div>
        );
      }
    });

    return (
      <div className="members-list">
        <ul>
          <div className='members-header'>ONLINE - {onlineList.length}</div>
          {onlineList}
          <div className='members-header'>OFFLINE - {offlineList.length}</div>
          {offlineList}
        </ul>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  let directMessages = Object.values(state.entities.directMessages);
  let membersList = state.entities.servers[ownProps.serverId].membersIds.map( id => {
    let friend = state.entities.users[id];
    friend.dm = directMessages.find((dm) => dm.recipientId === friend.id);
    return friend;
  });

  return {
    membersList: membersList,
    currentPath: ownProps.location.pathname
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => dispatch(logout()),
    createDm: friendId => dispatch(createDm(friendId)),
    unsubscribeToServer: (id) => (e) => {
      e.stopPropagation();
      dispatch(unsubscribeToServer(ownProps.serverId, id));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MembersList)
);
