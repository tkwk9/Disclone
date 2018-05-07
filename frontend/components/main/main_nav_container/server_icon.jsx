import React from 'react';
import {withRouter, NavLink, Link} from 'react-router-dom';

export default withRouter(props => {
  return (
      <NavLink className={`selector s-selector`}  to={`/${props.server.id}`}>
        <div className='server-img'>
          {props.server.imgURL ? <img src={props.server.imgURL}></img> : props.server.name.match(/\b(\w)/g).join('').slice(0,2)}
          {props.server.unreadCount ? <div className={`unreadCounter`}>{props.server.unreadCount}</div> : <div></div>}
        </div>
      </NavLink>
  );
});
