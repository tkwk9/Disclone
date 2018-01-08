import React from 'react';
import { logout } from '../../../actions/session_actions';
import { withRouter, NavLink } from 'react-router-dom';
import DmList from './dm_list/dm_list';

import { connect } from 'react-redux';

class SubNavContainer extends React.Component {
  constructor(props){
    super(props);
  }


  render() {
    return (
      <div className="sub-nav">
        <div className="head"></div>
        <DmList />
        <div className="footer">
          <button className='logoutButton' onClick={this.props.logout}>{this.props.currentUser.username}</button>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch, ownState) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SubNavContainer)
);
