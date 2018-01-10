import React from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../../../actions/ui_actions';


class FriendsListHead extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let onlineClass;
    let allClass;

    if (this.props.friendsListMode) {
      onlineClass = 'friends-selectable';
      allClass = 'friends-selectable selected';
    } else {
      onlineClass = 'friends-selectable selected';
      allClass = 'friends-selectable';

    }
    return (

      <div className="head">
        <button style={{height: '25px', margin: '0 10px', width: '100px'}} onClick={this.props.toggleAddFriendModal} >Add Friend</button>
        <div style={{height: '20px', width: "2px", backgroundColor: 'rgb(233, 231, 231)'}}></div>
        <button className={allClass} onClick={this.props.updateFriendList(true)}
        >All</button>
        <button className={onlineClass} onClick={this.props.updateFriendList(false)}
          >Online</button>
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
