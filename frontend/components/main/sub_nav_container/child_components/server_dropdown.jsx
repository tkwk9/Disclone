import React from 'react';
import { connect } from 'react-redux';
import { toggleModal, toggleDropdown } from '../../../../actions/ui_actions';
import { unsubscribeToServer, deleteServer } from '../../../../actions/servers_actions';

const ServerDropdown = props => {
  return (
    <div className={`server-options-popup ${props.dropdown}`}>
      <div className="server-option-invite"onClick={props.toggleInviteUserModal(props.serverId)}>
        <div className="server-option-icon invite-people"></div>
        Invite People
      </div>
      <div className="server-option-seperator"></div>
      <div className="server-option-item" onClick={props.toggleAddChannelModal(props.serverId)}>
        <div className="server-option-icon create-channels"></div>
        Create channels
      </div>
      <div className="server-option-item" onClick={props.toggleRenameServerModal(props.serverId)}>
        <div className="server-option-icon change-nickname"></div>
        Change Nickname
      </div>
      <div className="server-option-seperator"></div>
      <div className="server-option-item" onClick={props.leaveServer(props.serverId, props.currentUser.id)}>
        <div className="server-option-icon notification-settings"></div>
        Leave Server
      </div>
      <div className="server-option-item" onClick={props.deleteServer(props.serverId)}>
        <div className="server-option-icon delete-server"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ServerDropdown);
