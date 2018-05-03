import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
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
              canDelete={props.channelsList.length > 1}
            />
        ))}
      </ul>
    </div>
  );
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

export default withRouter(
  connect(mapStateToProps, null)(ChannelList)
);
