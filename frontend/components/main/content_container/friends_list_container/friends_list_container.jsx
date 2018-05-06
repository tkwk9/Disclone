import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FriendsList from './child_components/friends_list';
import FriendsListHead from './child_components/friends_list_head';


const FriendsListContainer = props => {
  return <div className="content-container">
      <FriendsListHead />
      <FriendsList />
    </div>;
};

export default withRouter(connect(null, null)(FriendsListContainer));
