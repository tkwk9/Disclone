import React from 'react';
import DmList from './dm_list';
import ChannelList from './channel_list';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


const SubNavContent = (props) => {
  return isNaN(props.serverId) ? (<DmList />) : (<ChannelList />);
};

const mapStateToProps = (state, ownProps) => {
  return {
    serverId: state.ui.serverId
  };
};

export default withRouter(connect(mapStateToProps, null)(SubNavContent));
