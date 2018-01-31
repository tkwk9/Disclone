import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions/ui_actions';
import AddFriendForm from './modal_content/add_friend_form';
import AddDmForm from './modal_content/add_dm_form';
import AddServerForm from './modal_content/add_server_form';
import AddChannelForm from './modal_content/add_channel_form';
import RenameChannelForm from './modal_content/rename_channel_form';
import RemoveChannelForm from './modal_content/remove_channel_form';
import RenameServerForm from './modal_content/rename_server_form';
import InviteUserForm from './modal_content/invite_user_form';
import ErrorPopup from './modal_content/error_popup';

class ModalContainer extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div onClick={this.props.toggleModalOff} id='modal-container' className={this.props.modalVisible ? "visible" : "hidden"}>
        {this.props.modalContent}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let modalContent;
  let modeArray = state.ui.modalMode.split('_');
  switch (modeArray[0]) {
    case 'addFriendForm':
      modalContent = <AddFriendForm />;
      break;
    case 'addDmForm':
      modalContent = <AddDmForm />;
      break;
    case 'addServerForm':
      modalContent = <AddServerForm />;
      break;
    case 'removeChannel':
      modalContent = <RemoveChannelForm channelId={modeArray[1]}/>;
      break;
    case 'renameChannel':
      modalContent = <RenameChannelForm channelId={modeArray[1]} />;
      break;
    case 'createChannel':
      modalContent = <AddChannelForm serverId={modeArray[1]} />;
      break;
    case 'renameServer':
      modalContent =<RenameServerForm serverId={modeArray[1]} />;
      break;
    case 'inviteUser':
      modalContent =<InviteUserForm serverId={modeArray[1]} />;
      break;
    case 'errorPopup':
      modalContent =<ErrorPopup errorMessage={modeArray[1]} />;
      break;
    default:
      modalContent = <div></div>;
  }
  return {
    modalVisible: state.ui.modalState,
    modalContent: modalContent
  };
};

const mapDispatchToProps = (dispatch, ownState) => {

  return {
    toggleModalOff: () => dispatch(toggleModal(false, ""))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ModalContainer)
);
