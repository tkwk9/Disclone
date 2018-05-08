import React from 'react';
import { connect } from 'react-redux';
import { toggleModal, toggleDropdown } from '../../../../actions/ui_actions';
import {withRouter} from 'react-router';
import { unsubscribeToServer, deleteServer } from '../../../../actions/servers_actions';

const ServerDropdown = props => {
  return (
    <div className={`server-dropdowns-popup ${props.dropdown}`}>
      <div className="server-dropdown-item invite"onClick={props.toggleInviteUserModal(props.serverId)}>
        <div className="server-dropdown-icon invite-people"></div>
        Invite People
      </div>
      <div className="server-dropdown-seperator"></div>
      <div className="server-dropdown-item" onClick={props.toggleAddChannelModal(props.serverId)}>
        <div className="server-dropdown-icon create-channels"></div>
        Create channels
      </div>
      <div className="server-dropdown-item" onClick={props.toggleRenameServerModal(props.serverId)}>
        <div className="server-dropdown-icon change-nickname"></div>
        Change Nickname
      </div>
      <div className="server-dropdown-seperator"></div>
      <div className="server-dropdown-item" onClick={props.leaveServer(props.serverId, props.currentUser.id)}>
        <div className="server-dropdown-icon leave-server"></div>
        Leave Server
      </div>
      <div className="server-dropdown-item" onClick={props.deleteServer(props.serverId)}>
        <div className="server-dropdown-icon delete-server"></div>
        Delete Server
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    dropdown: state.ui.dropdownOn ? 'open' : '',
    serverId: state.ui.serverId
  };
};

const mapDispatchToProps = (dispatch, ownState) => {
  return {
    toggleInviteUserModal: (serverId) => (e) => {
      e.stopPropagation();
      dispatch(toggleDropdown(false));
      dispatch(toggleModal(true, `inviteUser_${serverId}`));},
    toggleAddChannelModal: (serverId) => (e) => {
      e.stopPropagation();
      dispatch(toggleDropdown(false));
      dispatch(toggleModal(true, `createChannel_${serverId}`));},
    toggleRenameServerModal: (serverId) => (e) => {
      e.stopPropagation();
      dispatch(toggleDropdown(false));
      dispatch(toggleModal(true, `renameServer_${serverId}`));},
    leaveServer: (serverId, userId) => () => {
      dispatch(toggleDropdown(false));
      ownState.history.push('/@me');
      dispatch(unsubscribeToServer(serverId, userId));
    },
    deleteServer: (serverId) => () => {
      dispatch(toggleDropdown(false));
      ownState.history.push('/@me');
      dispatch(deleteServer(serverId));
    }

  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServerDropdown));
