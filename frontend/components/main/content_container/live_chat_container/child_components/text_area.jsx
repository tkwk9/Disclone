import React from 'react';
import {connect} from 'react-redux';
import {submitMessage} from '../../../../../actions/messages_actions';

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        author_id: props.currentUser.id,
        content: ""
      },
      messageable: {
        messageable: props.serverId,
        id: props.messageableId
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.serverId !== this.props.serverId ||
        newProps.messageableId !== this.props.messageableId){
      this.setState({
        message: {
          author_id: newProps.currentUser.id,
          content: ""
        },
        messageable: {
          messageable: newProps.serverId,
          id: newProps.messageableId
        }
      });
    }
  }

  handleInputChange(e) {
    this.setState({
      message: {
        author_id: this.props.currentUser.id,
        content: e.target.value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.scrollToBottom();
    this.props.submitMessage(this.state);
    this.setState({
      message: {
        author_id: this.props.currentUser.id,
        content: ""
      }
    });
  }

  render() {
    return <form onSubmit={this.handleSubmit}>
        <input
          type="text" onChange={this.handleInputChange}
          value={this.state.message.content}
          placeholder={`Message ${this.props.messageTarget}`}
        />
    </form>;
  }

}
const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    serverId: state.ui.serverId,
    messageableId: state.ui.messageableId,
    messageTarget: isNaN(state.ui.serverId)
      ? `@${state.entities.users[state.entities.directMessages[state.ui.messageableId].recipientId].username}`
      : `#${state.entities.channels[state.ui.messageableId].name}`,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitMessage: (data) => dispatch(submitMessage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TextArea);
