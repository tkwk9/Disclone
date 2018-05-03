import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { toggleModal } from '../../../../actions/ui_actions';

import ChannelItem from './channel_item';

const ChannelList = props => {
  return (
    <div className="content">
      <ul>
        <div className='channel-category-header'>TEXT CHANNELS</div>
        {props.channelsList.map((channel) => (
            <ChannelItem
              key={`${props.serverId}/${channel.id}`}
              channelId={channel.id}
              channelName={channel.unreadCount
                ? `${channel.name} (${channel.unreadCount})`
                : channel.name}
              serverId={props.serverId}
              deleteFunction={deleteChannelModal(channel.id)}
            />
        ))}
      </ul>
    </div>
  );

  function deleteChannelModal(channelId) {
    return (e) => {
      e.stopPropagation();
      props.channelsList.length > 1
        ? props.toggleModal(true, `removeChannel_${channelId}`)
        : props.toggleModal(true, 'errorPopup_There needs to be at least one channel.');
    };
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    channelsList: state.entities.servers[state.ui.serverId]
                    .channelIds
                    .map(channelId =>
                      state.entities.channels[channelId]),
    serverId: state.ui.serverId,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleModal: (modalStatus, modalMode) => dispatch(toggleModal(modalStatus, modalMode)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChannelList)
);
