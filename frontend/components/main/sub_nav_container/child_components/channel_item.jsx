import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { toggleModal } from '../../../../actions/ui_actions';
import { connect } from 'react-redux';
import * as svg from '../../../../util/svg';

const ChannelItem = props => {
  return (
    <NavLink className='channel-selector channel-list-selectable' to={`/${props.serverId}/${props.channelId}`}>
      <div className='hashtag'>
        {svg.hashtag()}
      </div>
      <div  className='channel-name'>{props.channelName}</div>
      {svg.gear(props.updateChannelModal(props.channelId))}
      <div className='unsubscribe' onClick={props.deleteChannel(props.channelId)}></div>
    </NavLink>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    unsubscribeDm: (id) => dispatch(unsubscribeDm(id)),
    updateChannelModal: id => e => {
      e.stopPropagation();
      dispatch(toggleModal(true, `renameChannel_${id}`));
    },
    deleteChannel: channelId => e => {
      e.stopPropagation();
      ownProps.canDelete
        ? dispatch(toggleModal(true, `removeChannel_${channelId}`))
        : dispatch(toggleModal(true, 'errorPopup_There needs to be at least one channel.'));
    }
  };
};

export default withRouter(
  connect(null, mapDispatchToProps)(ChannelItem)
);
