import React from 'react';
import { connect } from 'react-redux';
import { createDm, receiveDmError } from '../../../actions/direct_messages_actions';

class AddDmForm extends React.Component {
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
    if (targetId === "" || isNaN(targetId)){
      this.props.receiveDmError("You need to include user id");
    } else {
      this.props.createDm(targetId);
    }
  }

  render() {
    return(
      <form id='create-dm-form' onSubmit={this.submitForm} onClick={(e) => e.stopPropagation()}>
        <input onChange={this.handleChange} value={this.state.input}></input>
        <div>{this.props.friendsError}</div>
      </form>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    modalVisible: state.ui.modalState,
    friendsError: state.errors.misc.friends
  };
};

const mapDispatchToProps = (dispatch, ownState) => {

  return {
    createDm: (targetId) => dispatch(createDm(targetId)),
    receiveDmError: (string) => dispatch(receiveDmError(string))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDmForm);
