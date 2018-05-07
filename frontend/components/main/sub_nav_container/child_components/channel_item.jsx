import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { toggleModal } from '../../../../actions/ui_actions';
import { connect } from 'react-redux';
import * as svg from '../../../../util/svg';

const ChannelItem = props => {
  return (
    <NavLink className='channel-list-selectable' to={`/${props.serverId}/${props.channelId}`}>
      <div className='hashtag'>
        {svg.hashtag()}
      </div>
      <div  className='channel-name'>{props.channelName}</div>
      {svg.gear(props.updateChannelModal(props.channelId))}
      <div className='unsubscribe' onClick={props.deleteFunction}></div>
    </NavLink>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateChannelModal: id => e => {
      e.stopPropagation();
      dispatch(toggleModal(true, `renameChannel_${id}`));
    }
  };
};

export default withRouter(
  connect(null, mapDispatchToProps)(ChannelItem)
);
