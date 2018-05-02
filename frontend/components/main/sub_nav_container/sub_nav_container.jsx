import React from 'react';
import { logout } from '../../../actions/session_actions';
import { withRouter, NavLink } from 'react-router-dom';
import { toggleModal, toggleDropdown } from '../../../actions/ui_actions';
import { unsubscribeToServer, deleteServer } from '../../../actions/servers_actions';
import DmList from './child_components/dm_list';
import ChannelList from './child_components/channel_list';
import ServerPopup from './child_components/server_popup';
import { connect } from 'react-redux';

class SubNavContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      head: <div className="head" onClick={this.props.toggleAddDmModal}></div>,
      content: <DmList />
    };
    this.toggleHeadDropdown = this.toggleHeadDropdown.bind(this);
  }

  toggleHeadDropdown(e) {
    e.stopPropagation();
    if (this.props.dropdownMode === "server") {
      this.props.toggleClearDropdown();
    } else {
      this.props.toggleHeadDropdown();
    }
  }

  componentWillMount(){
    let headClass = "head";
    let headIndicatorClass = "indicator";
    let headIndicatorImg = window.staticImages.arrowIcon;
    let serverOptionsClass = "server-options-popup";
    if (this.props.dropdownMode === "server") {
      headClass = "head open";
      headIndicatorClass = "indicator open";
      headIndicatorImg = window.staticImages.closeIcon;
      serverOptionsClass = "server-options-popup open";
    }

    switch(this.props.mode) {
      case 'friends_list':
        this.setState({
          head:
            <div className="head" onClick={this.props.toggleAddDmModal}>
              <div className="findButton">Find or start a conversation</div>
            </div>,
          content: <DmList />
        });
        break;
      case 'DM':
        this.setState({
          head:
            <div className="head" onClick={this.props.toggleAddDmModal}>
              <div className="findButton">Find or start a conversation</div>
            </div>,
          content: <DmList />
        });
        break;
      default:
        this.setState({
          head:
          <div className={headClass} onClick={this.toggleHeadDropdown}>
            <div className="name">{this.props.serverList[this.props.mode].name}</div>
            <img className={headIndicatorClass} src={headIndicatorImg} alt=""/>
          </div>,
          content: <ChannelList serverId={this.props.mode} />
        });
    }
  }

  componentWillReceiveProps(newProps){

    let headClass = "head";
    let headIndicatorClass = "indicator";
    let headIndicatorImg = window.staticImages.arrowIcon;
    let serverOptionsClass = "server-options-popup";
    if (newProps.dropdownMode === "server") {
      headClass = "head open";
      headIndicatorClass = "indicator open";
      headIndicatorImg = window.staticImages.closeIcon;
      serverOptionsClass = "server-options-popup open";

    }

    switch(newProps.mode) {
      case 'friends_list':
        this.setState({
          head: <div className="head" onClick={this.props.toggleAddDmModal}>
            <div className="findButton">Find or start a conversation</div>
          </div>,
          content: <DmList />,
        });
        break;
      case 'DM':
        this.setState({
          head:
            <div className="head" onClick={this.props.toggleAddDmModal}>
              <div className="findButton">Find or start a conversation
              </div>
            </div>,
          content: <DmList />,
        });
        break;
      default:
        this.setState({
          head:
          <div className={headClass} onClick={this.toggleHeadDropdown}>
            <div className="name">{newProps.serverList[newProps.mode].name}</div>
            <img className={headIndicatorClass} src={headIndicatorImg} alt=""/>
          </div>,
          content: <ChannelList serverId={newProps.mode} />
        });
    }
  }

  render() {
    return (
      <div className="sub-nav">
        {this.state.head}
        <ServerPopup mode = {this.props.mode}/>
        {this.state.content}
        <div className="footer">
          <div className='current-user-wrapper'>
              <div className='name-tag'>
                <div className='user-img'>
                  <img src={this.props.currentUser.imgURL} />
                </div>
                <div className={`status-indicator true`}></div>
                <div className='namecontainer'>
                  <div className='username'>{this.props.currentUser.username}</div>
                  <div className='stringId'>{this.props.currentUser.stringId}</div>
                </div>
              </div>
              <div onClick={this.props.logout} className="logout"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    dropdownMode: state.ui.dropdownMode,
    serverList: state.entities.servers,
  };
};

const mapDispatchToProps = (dispatch, ownState) => {
  return {
    logout: () => dispatch(logout()),
    toggleAddDmModal: () => dispatch(toggleModal(true, 'addDmForm')),
    toggleHeadDropdown: () => dispatch(toggleDropdown(true, 'server')),
    toggleClearDropdown: () => dispatch(toggleDropdown(false, "")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubNavContainer);
