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
      <form id='create-friendship-form' onSubmit={this.submitForm} onClick={(e) => e.stopPropagation()}>
        <input onChange={this.handleChange} value={this.state.input} placeholder='@username#id'></input>
        <div>{this.props.serversError}</div>
      </form>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    modalVisible: state.ui.modalState,
    serversError: state.errors.misc.servers
  };
};

const mapDispatchToProps = (dispatch, ownState) => {

  return {
    createServer: (name) => dispatch(createServer(name)),
    receiveServerError: (string) => dispatch(receiveServerError(string))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddServerAction);
