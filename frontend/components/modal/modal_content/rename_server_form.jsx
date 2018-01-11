import React from 'react';
import { connect } from 'react-redux';
import { updateServer, receiveServerError } from '../../../actions/servers_actions';

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
    let targetId = inputArray[inputArray.length - 1];
    this.setState({
      input: ""
    });
    if (targetId === ""){
      this.props.receiveServerError("You need to enter valid error");
    } else {
      this.props.updateServer(targetId);
    }
  }

  render() {
    return(
      <form id='rename-server-form' onSubmit={this.submitForm} onClick={(e) => e.stopPropagation()}>
        <div className='form-title'>CHANGE SERVER NAME</div>
        <div className='form-sub-title'>You can change the server name here.</div>
        <input className={`${this.props.errors !== ""}`} onChange={this.handleChange} value={this.state.input} placeholder='Enter new server name'></input>
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
    updateServer: ( name) => dispatch(updateServer(ownProps.serverId, name)),
    receiveServerError: (string) => dispatch(receiveServerError(string))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RenameServerForm);
