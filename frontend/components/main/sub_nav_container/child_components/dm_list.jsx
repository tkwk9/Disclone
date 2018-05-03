import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as svg from '../../../../util/svg';
import DmItem from './dm_item';
const DmList = props => {
  return (
    <div className="content">
      <ul>
        <NavLink exact to='/@me' className="friends-list dm-list-selectable">
          {svg.friendsIcon()}
          <div className='channel-name'>Friends</div>
        </NavLink>
        <div className='direct-messages-header'>DIRECT MESSAGES</div>
        {props.dmList.map((dm) => {
          return (
            <DmItem
              key={dm.id}
              dm={dm}
              username={dm.unreadCount
                ? `${dm.recipient.username} (${dm.unreadCount})`
                : dm.recipient.username}
            />
          );
        })}
      </ul>
    </div>
  );
};


const mapStateToProps = (state, ownProps) => {
  return {
    dmList: Object.values(state.entities.directMessages).map(
      dm => {
        dm.recipient = state.entities.users[dm.recipientId];
        return dm;
      }
    )
  };
};

export default withRouter(
  connect(mapStateToProps, null)(DmList)
);
