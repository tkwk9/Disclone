import React from 'react';
import FriendsList from './child_components/friends_list';
import FriendsListHead from './child_components/friends_list_head';


export default props => {
  return <div className="content-container">
      <FriendsListHead />
      <FriendsList />
    </div>;
};
