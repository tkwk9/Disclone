import React from 'react';
import { logout } from '../../../../actions/session_actions';
import { withRouter, NavLink } from 'react-router-dom';
import { unsubscribeDm } from '../../../../actions/direct_messages_actions';
import { deleteChannel } from '../../../../actions/channels_actions';
import { toggleModal } from '../../../../actions/ui_actions';
import { connect } from 'react-redux';
import * as svg from '../../../../util/svg';

class ChannelList extends React.Component {
  constructor(props){
    super(props);
    this.switchChannels = this.switchChannels.bind(this);
    this.removeDm = this.removeDm.bind(this);
    this.redirectToFriendList = this.redirectToFriendList.bind(this);
  }

  switchChannels(id){
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

  updateChannelModal(id) {
    return (e) => {
      e.stopPropagation();
      this.props.updateModal(true, `renameChannel_${id}`);
    };
  }
  deleteChannel(id) {
    return (e) => {
      e.stopPropagation();
      if (this.props.channelsList.length > 1) {
        this.props.updateModal(true, `removeChannel_${id}`);
      } else {
        this.props.updateModal(true, 'errorPopup_There needs to be at least one channel.');
      }
    };
  }

  redirectToFriendList() {
    this.props.history.push('/@me');
  }
  render() {
    let channels = this.props.channelsList.map((channel) => {
      let username = channel.name;
      if (channel.unreadCount > 0){
        username += ` (${channel.unreadCount})`;
      }
      return (
        <NavLink className='channel-selector channel-list-selectable' key={channel.id} to={`/${this.props.serverId}/${channel.id}`}>
          <div className='hashtag'>
            {svg.hashtag()}
          </div>
          <div  className='channel-name'>{username}</div>
          {svg.gear(this.updateChannelModal(channel.id))}
          <div className='unsubscribe' onClick={this.deleteChannel(channel.id)}></div>
        </NavLink>
      );
    });

    return (
      <div className="content">
        <ul>
          <div className='channel-category-header'>TEXT CHANNELS</div>
          {channels}
        </ul>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  let channelsList = state.entities.servers[state.ui.serverId].channelIds.map(
    channelId => {
      return state.entities.channels[channelId];
    }
  );
  return {
    channelsList: channelsList,
    currentPath: ownProps.location.pathname
  };
};

const mapDispatchToProps = (dispatch, ownState) => {
  return {
    logout: () => dispatch(logout()),
    unsubscribeDm: (id) => dispatch(unsubscribeDm(id)),
    updateModal: (modalState, modalMode) => dispatch(toggleModal(modalState, modalMode)),
    deleteChannel: (channelId) => dispatch(deleteChannel(channelId))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChannelList)
);
