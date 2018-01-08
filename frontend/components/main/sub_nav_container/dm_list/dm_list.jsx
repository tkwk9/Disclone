import React from 'react';
import { logout } from '../../../../actions/session_actions';
import { withRouter, NavLink } from 'react-router-dom';
import { unsubscribeDm } from '../../../../actions/direct_messages_actions';
import { connect } from 'react-redux';
import * as svg from '../../../../util/svg';

class DmListContent extends React.Component {
  constructor(props){
    super(props);
    this.switchDms = this.switchDms.bind(this);
    this.removeDm = this.removeDm.bind(this);
    this.redirectToFriendList = this.redirectToFriendList.bind(this);
  }

  switchDms(id){
    return () => {
      if (this.props.location.pathname !== `/@me/${id}`){
        this.props.history.push(`/@me/${id}`);
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
          // <button onClick={this.removeDm(dm.id)} >unsubscribe</button>
  render() {
    let dms = this.props.dmList.map((dm) => {
      let username = dm.recipient.username;
      if (dm.unreadCount > 0){
        username += ` (${dm.unreadCount})`;
      }
      return (
        <NavLink className='dm-selector dm-list-selectable' key={dm.id} to={`/@me/${dm.id}`}>
          <div className='user-img'>
            <div className='image-holder'>
              <img src={dm.recipient.imgURL}></img>
            </div>
            <div className={`status-indicator ${dm.recipient.online}`}></div>
          </div>
          <div  className='channel-name'>{username}</div>
          <div className='unsubscribe' onClick={this.removeDm(dm.id)}></div>
        </NavLink>
      );
    });

    return (
      <div className="content">
        <ul>
          <NavLink exact to='/@me' className="friends-list dm-list-selectable">
            {svg.friendsIcon()}
            <div className='channel-name'>Friends</div>
          </NavLink>
          <div className='direct-messages-header'>DIRECT MESSAGES</div>
          {dms}
        </ul>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  let dmList = Object.values(state.entities.directMessages).map(
    dm => {
      dm.recipient = state.entities.users[dm.recipientId];
      return dm;
    }
  );
  return {
    dmList: dmList,
    currentPath: ownProps.location.pathname
  };
};

const mapDispatchToProps = (dispatch, ownState) => {
  return {
    logout: () => dispatch(logout()),
    unsubscribeDm: (id) => dispatch(unsubscribeDm(id))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DmListContent)
);
