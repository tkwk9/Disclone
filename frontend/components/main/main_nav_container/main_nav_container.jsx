import React from 'react';
import { logout } from '../../../actions/session_actions';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { unsubscribeDm } from '../../../actions/direct_messages_actions';

import { connect } from 'react-redux';

class SubNavContainer extends React.Component {
  constructor(props){
    super(props);
  }

  getDmList() {
    return this.props.dmList.map(
      (dm) => {
        return (
          <div key={dm.id} className={`dm-selector-wrapper ${dm.unreadCount > 0}`} >
            <Link className={`server-selector dm-selector ${dm.unreadCount > 0}`}  to={`/@me/${dm.id}`}>
              <div className='user-img'>
                <div className='image-holder'>
                  <img src={dm.recipient.imgURL}></img>
                </div>
                <div className={`unreadCounter`}>{dm.unreadCount}</div>
              </div>
            </Link>
          </div>

        );
      }
    );
  }

  render() {
    return (
      <div className="main-nav">
        <NavLink to='/@me' className='server-selector mp-selector' >
          <img src={'http://res.cloudinary.com/seaside9/image/upload/v1515372379/dm-icon_qagg2j.svg'}></img>
        </NavLink>
        <div className='friends-online'>{`${this.props.onlineUserCount} ONLINE`}</div>
        <ul className='dm-list'>
          {this.getDmList()}
        </ul>
        <div className='server-seperator'></div>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  let dmList = [];
  let friends = [];
  let onlineUserCount = 0;
  if (state.ui.sessionPayloadReceived) {
    dmList = Object.values(state.entities.directMessages).map(
      dm => {
        dm.recipient = state.entities.users[dm.recipientId];
        return dm;
      }
    );

    friends = state.session.currentUser.friendsList.map(id => {
      return state.entities.users[id];
    });

    onlineUserCount = friends.filter(
      user => {
        return user.online;
      }
    ).length;
  }

  return {
    dmList: dmList,
    onlineUserCount: onlineUserCount,
    currentPath: ownProps.location.pathname
  };
};

const mapDispatchToProps = (dispatch, ownState) => {
  return {

  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SubNavContainer)
);
