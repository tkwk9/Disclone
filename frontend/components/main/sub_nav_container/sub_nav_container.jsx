import React from 'react';
import { logout } from '../../../actions/session_actions';
import { withRouter, NavLink } from 'react-router-dom';
import { toggleModal } from '../../../actions/ui_actions';

import DmList from './dm_list/dm_list';
import ChannelList from './channel_list/channel_list';

import { connect } from 'react-redux';

class SubNavContainer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      head: <div className="head" onClick={this.props.toggleAddDmModal}></div>,
      content: <DmList />
    };
  }

  componentWillMount(){
    switch(this.props.mode) {
      case 'friends_list':
        this.setState({
          head:
            <div className="head" onClick={this.props.toggleAddDmModal}>
              <div style={{
                  backgroundColor: "#26272c",
                  borderRadius: "5px",
                  border: "1px solid #24252a",
                  color: "rgb(113, 114, 118)",
                  fontSize: "14px",
                  height: "32px",
                  width: "216px",
                  textAlign: "center",
                  verticalAlign: "middle",
                  lineHeight: "32px"

                }}>Find or start a conversation</div>
            </div>,
          content: <DmList />
        });
        break;
      case 'DM':
        this.setState({
          head:
          <div className="head" onClick={this.props.toggleAddDmModal}>
            <div style={{
                backgroundColor: "#26272c",
                borderRadius: "5px",
                border: "1px solid #24252a",
                color: "rgb(113, 114, 118)",
                fontSize: "14px",
                height: "32px",
                width: "216px",
                textAlign: "center",
                verticalAlign: "middle",
                lineHeight: "32px"
              }}>Find or start a conversation</div>
            </div>,
          content: <DmList />
        });
        break;
      default:
        this.setState({
          head: <div className="head" onClick={this.props.toggleAddDmModal}></div>,
          content: <ChannelList serverId={this.props.mode} />
        });
    }
  }

  componentWillReceiveProps(newProps){
    switch(newProps.mode) {
      case 'friends_list':
        this.setState({
          head: <div className="head" onClick={this.props.toggleAddDmModal}>
            <div style={{
                backgroundColor: "#26272c",
                borderRadius: "5px",
                border: "1px solid #24252a",
                color: "rgb(113, 114, 118)",
                fontSize: "14px",
                height: "32px",
                width: "216px",
                textAlign: "center",
                verticalAlign: "middle",
                lineHeight: "32px"

              }}>Find or start a conversation</div>
          </div>,
          content: <DmList />
        });
        break;
      case 'DM':
        this.setState({
          head: <div className="head" onClick={this.props.toggleAddDmModal}>
            <div style={{
                backgroundColor: "#26272c",
                borderRadius: "5px",
                border: "1px solid #24252a",
                color: "rgb(113, 114, 118)",
                fontSize: "14px",
                height: "32px",
                width: "216px",
                textAlign: "center",
                verticalAlign: "middle",
                lineHeight: "32px"

              }}>Find or start a conversation</div>
          </div>,
          content: <DmList />
        });
        break;
      default:
        this.setState({
          head: <div className="head" onClick={this.props.toggleAddDmModal}></div>,
          content: <ChannelList serverId={newProps.mode} />
        });
    }
  }


  render() {
    return (
      <div className="sub-nav">
        {this.state.head}
        {this.state.content}
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
    logout: () => dispatch(logout()),
    toggleAddDmModal: () => dispatch(toggleModal(true, 'addDmForm'))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SubNavContainer)
);
