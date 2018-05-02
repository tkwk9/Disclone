import React from 'react';
import DmList from './dm_list';
import ChannelList from './channel_list';
import { toggleModal, toggleDropdown } from '../../../../actions/ui_actions';
import { logout } from '../../../../actions/session_actions';
import {connect} from 'react-redux';

const SubNavFooter = props => {
  return (<div className="footer">
    <div className='current-user-wrapper'>
        <div className='name-tag'>
          <div className='user-img'>
            <img src={props.currentUser.imgURL} />
          </div>
          <div className={`status-indicator true`}></div>
          <div className='namecontainer'>
            <div className='username'>{props.currentUser.username}</div>
            <div className='stringId'>{props.currentUser.stringId}</div>
          </div>
        </div>
        <div onClick={props.logout} className="logout"></div>
    </div>
  </div>);
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = (dispatch, ownState) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubNavFooter);
