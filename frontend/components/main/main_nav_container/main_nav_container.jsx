import React from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import {toggleModal} from '../../../actions/ui_actions';
import {connect} from 'react-redux';
import DmIcon from './dm_icon';
import ServerIcon from './server_icon';

const MainNavContainer = props => {
  return (
    <div className="main-nav">
      <NavLink to='/@me' className='selector mp-selector' >
        <img src={'http://res.cloudinary.com/seaside9/image/upload/v1515372379/dm-icon_qagg2j.svg'}></img>
      </NavLink>
      <div className='friends-online'>{`${props.onlineUserCount} ONLINE`}</div>
      <ul className='dm-list'>
        {props.dmList.map(dm => (<DmIcon key={`dm: ${dm.id}`}dm={dm}/>))}
      </ul>
      <div className='server-seperator'></div>
      <ul className='dm-list'>
        {props.serverList.map(
          server => (<ServerIcon key={`server: ${server.id}`}server={server} />)
        )}
        <div className="new-server-button" onClick={props.toggleAddServerModal}>+</div>
      </ul>
      <div className='server-seperator'></div>
      <a className="selector social linked-in" href="https://www.linkedin.com/in/tim-kwak/"></a>
      <a className="selector social github" href="https://github.com/Seaside9/Disclone"></a>
      <a className="selector social website" href="http://timkwak.com"></a>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  let dmList = [], serverList = [],
    friends = [], onlineUserCount = 0;
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
    onlineUserCount = friends.filter(user => user.online).length;
  }

  return {
    dmList: dmList,
    serverList: serverList,
    onlineUserCount: onlineUserCount
  };
};

const mapDispatchToProps = (dispatch, ownState) => {
  return {
    toggleAddServerModal: () => dispatch(toggleModal(true, 'addServerForm'))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainNavContainer)
);
