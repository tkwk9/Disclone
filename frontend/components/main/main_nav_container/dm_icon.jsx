import React from 'react';
import {withRouter, Link} from 'react-router-dom';

export default withRouter(props => {
  return (
      <Link className={`selector dm-selector ${props.dm.unreadCount > 0}`}  to={`/@me/${props.dm.id}`}>
        <div className={`dm-icon-wrapper ${props.dm.unreadCount > 0}`}>
          <div className='user-img'>
            <div className='image-holder'>
              <img src={props.dm.recipient.imgURL}></img>
            </div>
            <div className={`unreadCounter`}>{props.dm.unreadCount}</div>
          </div>
        </div>
      </Link>
  );
});
