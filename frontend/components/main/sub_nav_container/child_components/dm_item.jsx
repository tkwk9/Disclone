import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { unsubscribeDm } from '../../../../actions/direct_messages_actions';
import { connect } from 'react-redux';
import * as svg from '../../../../util/svg';

const DmItem = props => {
  return (
    <NavLink className='dm-selector dm-list-selectable' to={`/@me/${props.dm.id}`}>
      <div className='user-img'>
        <div className='image-holder'>
          <img src={props.dm.recipient.imgURL}></img>
        </div>
        <div className={`status-indicator ${props.dm.recipient.online}`}></div>
      </div>
      <div  className='channel-name'>{props.username}</div>
      <div className='unsubscribe' onClick={props.removeDm}></div>
    </NavLink>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeDm: e => {
      e.preventDefault();
      e.stopPropagation();
      if (ownProps.currentPath === `/@me/${ownProps.dm.id}`){
        ownProps.history.push(`/@me`);
      }
      dispatch(unsubscribeDm(ownProps.dm.id));
    }
  };
};

export default withRouter(
  connect(null, mapDispatchToProps)(DmItem)
);
