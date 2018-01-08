import React from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../../../actions/ui_actions';


class FriendsListHead extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="head">
        <button style={{height: '36px', margin: '0 10px', width: '100px'}} onClick={this.props.toggleAddFriendModal} >Add Friend</button>
        <button style={{height: '36px', margin: '0 10px', width: '100px'}} onClick={this.props.updateFriendList(true)} >All</button>
        <button style={{height: '36px', margin: '0 10px', width: '100px'}} onClick={this.props.updateFriendList(false)} >Online</button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    modalVisible: state.ui.modalState
  };
};

const mapDispatchToProps = (dispatch, ownState) => {

  return {
    toggleAddFriendModal: () => dispatch(toggleModal(true, 'addFriendForm'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsListHead);
