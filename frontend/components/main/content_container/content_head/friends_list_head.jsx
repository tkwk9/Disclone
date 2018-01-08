import React from 'react';

class FriendsListHead extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="head">
        <button style={{height: '36px', margin: '0 10px', width: '100px'}} onClick={this.props.updateFriendList(true)} >Add Friend</button>
        <button style={{height: '36px', margin: '0 10px', width: '100px'}} onClick={this.props.updateFriendList(true)} >All</button>
        <button style={{height: '36px', margin: '0 10px', width: '100px'}} onClick={this.props.updateFriendList(false)} >Online</button>
      </div>
    );
  }
}

export default FriendsListHead;
