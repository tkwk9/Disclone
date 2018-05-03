import React from 'react';
import { withRouter, NavLink, Link } from 'react-router-dom';

export default withRouter(props => {
  return (
    <div key={props.dm.id} className={`selector-wrapper ${props.dm.unreadCount > 0}`} >
      <Link className={`selector dm-selector ${props.dm.unreadCount > 0}`}  to={`/@me/${props.dm.id}`}>
        <div className='user-img'>
          <div className='image-holder'>
            <img src={props.dm.recipient.imgURL}></img>
          </div>
          <div className={`unreadCounter`}>{props.dm.unreadCount}</div>
        </div>
      </Link>
    </div>
  );
});
