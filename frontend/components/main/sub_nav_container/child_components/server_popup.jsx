import React from 'react';
import { connect } from 'react-redux';
import { toggleModal, toggleDropdown } from '../../../../actions/ui_actions';
import { unsubscribeToServer, deleteServer } from '../../../../actions/servers_actions';


class ServerPopup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`server-options-popup ${this.props.popupStatus}`}>
        <div className="server-option-invite"onClick={this.props.toggleInviteUserModal(this.props.mode)}>
          <div className="server-option-icon invite-people"></div>
          Invite People
        </div>
        <div className="server-option-seperator"></div>
        <div className="server-option-item" onClick={this.props.toggleAddChannelModal(this.props.mode)}>
          <div className="server-option-icon create-channels"></div>
          Create channels
        </div>
        <div className="server-option-item" onClick={this.props.toggleRenameServerModal(this.props.mode)}>
          <div className="server-option-icon change-nickname"></div>
          Change Nickname
        </div>
        <div className="server-option-seperator"></div>
        <div className="server-option-item" onClick={this.props.leaveServer(this.props.mode, this.props.currentUser.id)}>
          <div className="server-option-icon notification-settings"></div>
          Leave Server
        </div>
        <div className="server-option-item" onClick={this.props.deleteServer(this.props.mode)}>
          <div className="server-option-icon delete-server"></div>
          Delete Server
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    popupStatus: state.ui.dropdownMode === 'server' ? 'open' : '',
    serverList: state.entities.servers,
  };
};

const mapDispatchToProps = (dispatch, ownState) => {
  return {
    toggleInviteUserModal: (serverId) => (e) => {
      e.stopPropagation();
      dispatch(toggleDropdown(false, ""));
      dispatch(toggleModal(true, `inviteUser_${serverId}`));},
    toggleAddChannelModal: (serverId) => (e) => {
      e.stopPropagation();
      dispatch(toggleDropdown(false, ""));
      dispatch(toggleModal(true, `createChannel_${serverId}`));},
    toggleRenameServerModal: (serverId) => (e) => {
      e.stopPropagation();
      dispatch(toggleDropdown(false, ""));
      dispatch(toggleModal(true, `renameServer_${serverId}`));},
    leaveServer: (serverId, userId) => () => {
      dispatch(toggleDropdown(false, ""));
      ownState.history.push('/@me');
      dispatch(unsubscribeToServer(serverId, userId));
    },
    deleteServer: (serverId) => () => {
      dispatch(toggleDropdown(false, ""));
      ownState.history.push('/@me');
      dispatch(deleteServer(serverId));
    }

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerPopup);
