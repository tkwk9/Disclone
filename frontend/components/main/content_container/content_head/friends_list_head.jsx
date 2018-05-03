import React from 'react';
import { connect } from 'react-redux';
import { toggleModal, updateFriendsListMode } from '../../../../actions/ui_actions';

const FriendsListHead = props => {
  return (
    <div className="head">
      <button style={{height: '25px', margin: '0 10px', width: '100px'}} onClick={props.toggleAddFriendModal} >Add Friend</button>
      <div style={{height: '20px', width: "2px", backgroundColor: 'rgb(233, 231, 231)'}}></div>
      <button
        className={`friends-selectable${props.allSelected ? ' selected' : ''}`}
        onClick={props.updateFriendsListMode('all')}
      >All</button>
      <button 
        className={`friends-selectable${props.allSelected ? '' : ' selected'}`}
        onClick={props.updateFriendsListMode('online')}
      >Online</button>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    allSelected: state.ui.friendsListMode === 'all'
  };
};

const mapDispatchToProps = (dispatch, ownState) => {
  return {
    toggleAddFriendModal: () => dispatch(toggleModal(true, 'addFriendForm')),
    updateFriendsListMode: mode => () => dispatch(updateFriendsListMode(mode))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsListHead);
