import React from 'react';
import { connect } from 'react-redux';
import { deleteChannel } from '../../../actions/channels_actions';
import { toggleModal } from '../../../actions/ui_actions';

class RenameChannelForm extends React.Component {
  constructor(props){
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  // handleChange(e) {
  //   this.setState({
  //     input: e.target.value
  //   });
  // }

  submitForm(e) {
    e.preventDefault();
    this.props.removeChannel(this.props.channelId);
    this.props.removeModal();
  }

  removeModal(e) {
    e.preventDefault();
    this.props.removeChannel(this.props.channelId);
  }



  render() {
    return(
      <form id='update-channel-form' onSubmit={this.submitForm} onClick={(e) => e.stopPropagation()}>
        <div className='form-title'>DELETE CHANNEL NAME</div>
        <div className='form-sub-title'>Are you sure you want to delete this channel?</div>
        <div className='form-sub-title'>(All messages associated with this channel will be permanetly deleted)</div>
        <div className='buttons'>
          <div className="no-button" onClick={this.props.removeModal}>Nevermind</div>
          <button>Yes</button>
        </div>
      </form>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    modalVisible: state.ui.modalState,
    errors: state.errors.misc.channels
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    removeChannel: ( id ) => dispatch(deleteChannel(id)),
    removeModal: () => dispatch(toggleModal(false, ""))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RenameChannelForm);
