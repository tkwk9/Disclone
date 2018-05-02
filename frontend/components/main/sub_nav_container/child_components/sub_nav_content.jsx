import React from 'react';
import DmList from './dm_list';
import ChannelList from './channel_list';
import {connect} from 'react-redux';

const SubNavContent = (props) => {
  return isNaN(props.serverId) ? (<DmList />) : (<ChannelList />);
};

const mapStateToProps = (state, ownProps) => {
  return {
    serverId: state.ui.serverId
  };
};

export default connect(mapStateToProps, null)(SubNavContent);
