import React from 'react';
import { connect } from 'react-redux';
import {
  createChannel,
  receiveChannelError
} from '../../../actions/channels_actions';

class RenameServerForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  submitForm(e) {
    e.preventDefault();
    let inputArray = this.state.input.split('#');
    let name = inputArray[inputArray.length - 1];
    this.setState({
      input: ""
    });
    if (name === ""){
      this.props.receiveChannelError("You need to enter valid error");
    } else {
      this.props.createChannel(name);
    }
  }

  render() {
    return(
      <form id='add-channel-form' onSubmit={this.submitForm} onClick={(e) => e.stopPropagation()}>
        <div className='form-title'>CREATE CHANNEL</div>
        <div className='form-sub-title'>You can create a new channel here.</div>
        <input className={`${this.props.errors !== ""}`} onChange={this.handleChange} value={this.state.input} placeholder='Enter new channel name'></input>
        <div className="error">{this.props.errors}</div>
      </form>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    modalVisible: state.ui.modalState,
    errors: state.errors.misc.servers
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    createChannel: ( name) => dispatch(createChannel(ownProps.serverId, name)),
    receiveChannelError: (string) => dispatch(receiveChannelError(string))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RenameServerForm);
