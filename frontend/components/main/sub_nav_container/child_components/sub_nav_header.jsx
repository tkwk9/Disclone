import React from 'react';
import DmList from './dm_list';
import ChannelList from './channel_list';
import { toggleModal, toggleDropdown } from '../../../../actions/ui_actions';
import {connect} from 'react-redux';

const SubNavHeader = (props) => {
  let headClass = "head";
  let headIndicatorClass = "indicator";
  let headIndicatorImg = window.staticImages.arrowIcon;
  let serverOptionsClass = "server-options-popup";
  let toggleFunction = props.toggleHeadDropdown;
  if (props.dropdownMode === "server") {
    headClass = "head open";
    headIndicatorClass = "indicator open";
    headIndicatorImg = window.staticImages.closeIcon;
    serverOptionsClass = "server-options-popup open";
    toggleFunction = props.toggleClearDropdown;
  }
  return isNaN(props.serverId)
    ? (<div className="head" onClick={props.toggleAddDmModal}>
        <div className="findButton">Find or start a conversation</div>
      </div>)
    : (<div className={headClass} onClick={toggleFunction}>
        <div className="name">{props.serverName}</div>
        <img className={headIndicatorClass} src={headIndicatorImg} alt=""/>
      </div>);
};

const mapStateToProps = (state, ownProps) => {
  return {
    serverId: state.ui.serverId,
    dropdownMode: state.ui.dropdownMode,
    serverName: isNaN(state.ui.serverId)
      ? null
      : state.entities.servers[state.ui.serverId].name
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleAddDmModal: () => dispatch(toggleModal(true, 'addDmForm')),
    toggleHeadDropdown: (e) => {
      e.stopPropagation();
      dispatch(toggleDropdown(true, 'server'));
    },
    toggleClearDropdown: (e) => {
      e.stopPropagation();
      dispatch(toggleDropdown(false, ""));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubNavHeader);
