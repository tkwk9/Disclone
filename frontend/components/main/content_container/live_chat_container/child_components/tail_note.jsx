import React from 'react';
import {connect} from 'react-redux';

const TailNote = props => {
  return props.beginningMessage
    ? isNaN(props.serverId)
      ? <div className="beginning-of-message">
          <div className="msg-holder">
            This is the beginning of conversation {<span>with <span style={{fontWeight:"700"}}>{props.messageTarget}</span></span>}
          </div>
        </div>
      : <div className="beginning-of-message">
          <div className="msg-holder">
            This is the beginning of conversation {<span>in <span style={{fontWeight:"700"}}>{props.messageTarget}</span> channel</span>}
          </div>
        </div>
    : props.infReq
      ? <div className="tail-note">
          <div className="spinner">
            <div className="cube1"></div>
            <div className="cube2"></div>
          </div>
        </div>
      : <div className="tail-note">Scroll up to load more</div>;
};

const mapStateToProps = (state, ownProps) => {
  return {
    serverId: state.ui.serverId,
    messageTarget: isNaN(state.ui.serverId)
      ? `@${state.entities.users[state.entities.directMessages[state.ui.messageableId].recipientId].username}`
      : `#${state.entities.channels[state.ui.messageableId].name}`,
    infReq: state.ui.infReq
  };
};

export default connect(mapStateToProps, null)(TailNote);
