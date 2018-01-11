import React from 'react';
import { connect } from 'react-redux';
import { createServer, receiveServerError } from '../../../actions/servers_actions';

class AddServerAction extends React.Component {
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
    let input = this.state.input;
    this.setState({
      input: ""
    });
    if (input === "") {
      this.props.receiveServersError("Server name cannot be blank");
    } else {
      this.props.createServer(input);
    }
  }

  render() {
    return(
      <form id='add-channel-form' onSubmit={this.submitForm} onClick={(e) => e.stopPropagation()}>
        <div className='form-title'>CREATE SERVER</div>
        <div className='form-sub-title'>You can create a new server here.</div>
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

const mapDispatchToProps = (dispatch, ownState) => {

  return {
    createServer: (name) => dispatch(createServer(name)),
    receiveServerError: (string) => dispatch(receiveServerError(string))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddServerAction);
