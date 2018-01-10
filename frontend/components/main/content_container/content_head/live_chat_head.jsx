import React from 'react';
import { connect } from 'react-redux';
import * as svg from '../../../../util/svg';


class LiveChatHead extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    if (this.props.type === 'DM') {
      let status = this.props.target.online ? "#43b581" : "#747f8d";
      return (
        <div className="head">
          <div className="username">@ <span style={{fontWeight:"700"}}>{this.props.target.username}</span>
            <div style={{width:"10px", height:"10px", backgroundColor:status, marginLeft:"5px", borderRadius: "5px"}}></div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="head">
          {svg.hashtag()}
          <div className="channel-name">{this.props.target.name}</div>
        </div>
      );
    }
  }

}

const mapStateToProps = (state, ownProps) => {

  let target;
  if (ownProps.type === 'DM') {
    target = state.entities.users[state.entities.directMessages[ownProps.messageableId].recipientId];
  } else {
    target = state.entities.channels[ownProps.messageableId];
  }

  return {
    target: target
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveChatHead);
