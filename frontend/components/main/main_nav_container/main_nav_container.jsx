import React from 'react';
import { logout } from '../../../actions/session_actions';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { unsubscribeDm } from '../../../actions/direct_messages_actions';
import { toggleModal } from '../../../actions/ui_actions';

import { connect } from 'react-redux';

class SubNavContainer extends React.Component {
  constructor(props){
    super(props);
  }

  getDmList() {
    return this.props.dmList.map(
      (dm) => {
        return (
          <div key={dm.id} className={`selector-wrapper ${dm.unreadCount > 0}`} >
            <Link className={`selector dm-selector ${dm.unreadCount > 0}`}  to={`/@me/${dm.id}`}>
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

  getServerList() {
    return this.props.serverList.map(
      (server) => {
        let img;
        if (server.imgURL){
          img = <img src={server.imgURL}></img>;
        } else {
          img = server.name.match(/\b(\w)/g).join('').slice(0,2);
        }
        let unreadCounter = <div></div>;
        if (server.unreadCount > 0) {
          unreadCounter = <div className={`unreadCounter`}>{server.unreadCount}</div>;
        }
        return (
          <div key={server.id} className={`selector-wrapper true`} >
            <NavLink className={`selector s-selector true`}  to={`/${server.id}`}>
              <div className='server-img'>
                {img}
                {unreadCounter}
              </div>
            </NavLink>
          </div>
        );
      }
    );
  }

  render() {
    return (
      <div className="main-nav">
        <NavLink to='/@me' className='selector mp-selector' >
          <img src={'http://res.cloudinary.com/seaside9/image/upload/v1515372379/dm-icon_qagg2j.svg'}></img>
        </NavLink>
        <div className='friends-online'>{`${this.props.onlineUserCount} ONLINE`}</div>
        <ul className='dm-list'>
          {this.getDmList()}
        </ul>
        <div className='server-seperator'></div>
        <ul className='dm-list'>
          {this.getServerList()}
          <div className="new-server-button" onClick={this.props.toggleAddServerModal}>+</div>
        </ul>
        <div className='server-seperator'></div>
        <a className="selector social linked-in" href="https://www.linkedin.com/in/tim-kwak/">

		    </a>
        <a className="selector social github" href="https://github.com/Seaside9/Disclone">

		    </a>
        <a className="selector social website" href="http://timkwak.com">

		    </a>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  let dmList = [];
  let serverList = [];
  let friends = [];
  let onlineUserCount = 0;
  if (state.ui.sessionPayloadReceived) {
    dmList = Object.values(state.entities.directMessages).map(
      dm => {
        dm.recipient = state.entities.users[dm.recipientId];
        return dm;
      }
    );

    serverList = Object.values(state.entities.servers).map(
      server => {
        server.unreadCount =
          server.channelIds.reduce((acc, channelId) => {
            return acc + state.entities.channels[channelId].unreadCount;
          }, 0);
        return server;
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
    serverList: serverList,
    onlineUserCount: onlineUserCount,
    currentPath: ownProps.location.pathname
  };
};

const mapDispatchToProps = (dispatch, ownState) => {
  return {
    toggleAddServerModal: () => dispatch(toggleModal(true, 'addServerForm'))

  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SubNavContainer)
);
