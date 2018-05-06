import React from 'react';
import {connect} from 'react-redux';
import {createDm} from '../../../../../../actions/direct_messages_actions';
import {withRouter} from 'react-router-dom';

const MemberItem = props => {
  return (
    <div className='member-selector member-list-selectable' key={props.member.id} onClick={props.switchDm}>
      <div className='user-img'>
        <div className='image-holder'>
          <img src={props.member.imgURL}></img>
        </div>
        <div className={`status-indicator ${props.member.online}`}></div>
      </div>
      <div  className='channel-name'>{props.member.username}</div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    switchDm: (e) => {
      ownProps.member.dm
        ? ownProps.history.push(`/@me/${ownProps.member.dm.id}`)
        : dispatch(createDm(ownProps.member.id));
    }
  };
};

export default withRouter(
  connect(null, mapDispatchToProps)(MemberItem)
);
