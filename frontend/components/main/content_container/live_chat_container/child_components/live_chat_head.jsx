import React from 'react';
import {connect} from 'react-redux';
import * as svg from '../../../../../util/svg';

const LiveChatHead = props => {
  return isNaN(props.type)
    ? <div className="head">
        <div className="username">
          @ <span>{props.target.username}</span>
          <div className={
              `online-indicator${props.target.online ? " online" : ""}`
            }></div>
        </div>
      </div>
    : <div className="head">
        {svg.hashtag()}
        <div className="channel-name">{props.target.name}</div>
      </div>;
};

const mapStateToProps = (state, ownProps) => {
  return {
    target: isNaN(state.ui.serverId)
      ? state.entities.users[state.entities.directMessages[ownProps.messageableId].recipientId]
      : state.entities.channels[ownProps.messageableId],
    type: state.ui.serverId
  };
};

export default connect(mapStateToProps, null)(LiveChatHead);
