import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import React from 'react';
import {createDm} from '../../../../../actions/direct_messages_actions';
import {deleteFriendship} from '../../../../../actions/friends_actions';

const FriendSelector = props => {
  return (
    <div className='friend-wrapper'>
      <li className='friend-selector' onClick={props.switchDm}>
        <div className='name-tag'>
          <div className='user-img'>
            <img src={props.friend.imgURL} />
          </div>
          <div className='username'>
            {props.friend.username}<span>{props.friend.stringId}</span>
          </div>
        </div>
        <div className='status-wrapper'>
          <div className={`status-indicator ${props.friend.online}`}></div>
          <div className='status'>{props.friend.online ? 'Online' : 'Offline'}</div>
        </div>
        <div onClick={props.deleteFriendship} className="unfriend-button"></div>
      </li>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    switchDm: () => {
      ownProps.friend.dm
        ? ownProps.history.push(`/@me/${ownProps.friend.dm.id}`)
        : dispatch(createDm(ownProps.friend.id));
      },
    deleteFriendship: (e) => {
      e.stopPropagation();
      dispatch(deleteFriendship(ownProps.friend.id));
    }
  };
};

export default withRouter(
  connect(null, mapDispatchToProps)(FriendSelector)
);
