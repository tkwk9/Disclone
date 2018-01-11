import React from 'react';
import { connect } from 'react-redux';
import { updateServer, receiveServerError } from '../../../actions/servers_actions';

class ErrorPopup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: ""
    };
  }

  render() {
    return(
      <form id='error-popup' onSubmit={this.submitForm} onClick={(e) => {}}>
        <div className='title'>Error:</div>
        <div className='message'>{this.props.errorMessage}</div>
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

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPopup);
