import React from 'react';
import { logout } from '../../../actions/session_actions';
import { withRouter } from 'react-router-dom';
import {unsubscribeDm } from '../../../actions/direct_messages_actions';

import {connect} from 'react-redux';

class SubNavContainer extends React.Component {
  constructor(props){
    super(props);
    this.switchDms = this.switchDms.bind(this);
    this.removeDm = this.removeDm.bind(this);
  }

  switchDms(id){
    return () => {
      if (this.props.location.pathname !== `/@me/${id}`){
        this.props.history.push(`/@me/${id}`);
      }
    };
  }

  removeDm(id, dmId){
    return () => {
      if (this.props.location.pathname === `/@me/${dmId}`){
        this.props.history.push(`/@me`);
      }
      this.props.unsubscribeDm(id);
    };
  }

  render() {
    let dms = this.props.dmList.map((dm) => {
      return (
        <li style={{display: "flex", flexDirection: 'row', marginBottom: '10px'}}key={dm.id}>
          <button onClick={this.switchDms(dm.id)} style={{marginRight: "5px", padding: "0 10px"}}>{dm.recipient.username}</button>
          <button onClick={this.removeDm(dm.recipientId, dm.id)} style={{padding: "0 10px"}}>unsubscribe</button>
        </li>
      );
    });

    return (
      <div className="sub-nav">
        <div className="head"></div>
        <div className="content">
          <ul>
            <button onClick={() => this.props.history.push('/@me')} style={{marginBottom: '10px'}}>friendsList</button>
            {dms}
          </ul>
        </div>
        <div className="footer">
          <button className='logoutButton' onClick={this.props.logout}>logout</button>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

  return {
    dmList: Object.values(state.entities.directMessages).
          map((dm) =>{
            dm.recipient = state.entities.users[dm.recipientId];
            return dm;
          })
  };
};

const mapDispatchToProps = (dispatch, ownState) => {
  return {
    logout: () => dispatch(logout()),
    unsubscribeDm: (id) => dispatch(unsubscribeDm(id))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubNavContainer));
