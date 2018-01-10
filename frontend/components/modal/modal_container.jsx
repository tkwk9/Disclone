import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions/ui_actions';
import AddFriendForm from './modal_content/add_friend_form';
import AddDmForm from './modal_content/add_dm_form';
import AddServerForm from './modal_content/add_server_form';

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
  switch (state.ui.modalMode) {
    case 'addFriendForm':
      modalContent = <AddFriendForm />;
      break;
    case 'addDmForm':
      modalContent = <AddDmForm />;
      break;
    case 'addServerForm':
      modalContent = <AddServerForm />;
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
    toggleModalOff: () => dispatch(toggleModal(false, undefined))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ModalContainer)
);
