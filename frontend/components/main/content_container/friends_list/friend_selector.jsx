import React from 'react';

export default (props) => {
  return (
    <div className='friend-wrapper'>
      <li className='friend-selector' onClick={props.switchDms}>
        <div className='name-tag'>
          <div className='user-img'>
            <img src={props.friend.imgURL} />
          </div>
          <div className='username'>{props.friend.username}<span>{props.friend.stringId}</span></div>
        </div>
        <div className='status-wrapper'>
          <div className={`status-indicator ${props.friend.online}`}></div><div className='status'>{props.friend.online ? 'Online' : 'Offline'}</div>
        </div>
        <div onClick={props.deleteFriendship} className="unfriend-button"></div>
      </li>
    </div>
  );
};
