import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import React from 'react';
import { fetchUser, toggleOnline } from '../actions/users_actions';
import {
  fetchSessionPayload, forceLogout
} from '../actions/session_actions';
import { fetchFriendsList } from '../actions/friends_actions';
import { fetchDm } from '../actions/direct_messages_actions';
import { fetchChannel, removeChannel } from '../actions/channels_actions';
import { fetchServer, removeServer } from '../actions/servers_actions';
import { fetchMessage } from '../actions/messages_actions';
import ActionCable from 'actioncable';

class ActionCableContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.subscribe();
  }

  subscribe() {
    this.consumer = ActionCable.createConsumer();
    this.subscription =
      this.consumer.subscriptions.create({channel: 'DirectChannel'}, {
      received: ({ command, options })=> {
        switch (command){
          case 'fetch_session_payload':
            this.props.fetchSessionPayload();
            break;
          case 'fetch_message':
            this.props.fetchMessage(options.messageId, this.props.location.pathname);
            break;
          case 'fetch_friends_list':
            this.props.fetchFriendsList();
            break;
          case 'toggle_online':
            this.props.toggleOnline(options.userId, options.onlineStatus);
            break;
          case 'fetch_user':
            this.props.fetchUser(options.userId);
            break;
          case 'fetch_dm':
            this.props.fetchDm(options.targetId);
            break;
          case 'fetch_channel':
            this.props.fetchChannel(options.channelId); // TODO: do this.
            break;
          case 'remove_channel':
          // redirect if appropriate here
            this.props.removeChannel(options.payload, this.props.location.pathname); // TODO: add this
            break;
          case 'fetch_server':
            this.props.fetchServer(options.serverId); // TODO: add this
            break;
          case 'remove_server':
            // redirect if appropriate here
            this.props.removeServer(options.payload, this.props.location.pathname);
            break;
          case 'print':
            console.log(options.message);
            break;
          case 'force_logout':
            this.subscription.unsubscribe();
            this.props.forceLogout(() => {
              console.log('force called');
            });
            break;
          default:
            console.log(`Unknown Command Received: ${command}`);
        }
      }
    });
  }

  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownState) => {
  return {
    fetchSessionPayload: () => dispatch(fetchSessionPayload()),
    fetchMessage: (id, path) => dispatch(fetchMessage(id, path)),
    fetchFriendsList: () => dispatch(fetchFriendsList()),
    fetchUser: (id) => dispatch(fetchUser(id)),
    toggleOnline:
      (userId, onlineStatus) => dispatch(toggleOnline(userId, onlineStatus)),
    fetchDm: (id) => dispatch(fetchDm(id)),
    fetchChannel: (channelId) => dispatch(fetchChannel(channelId)),
    removeChannel: (payload, path) => dispatch(removeChannel(payload, path)),
    fetchServer: (serverId) => dispatch(fetchServer(serverId)),
    removeServer: (payload, path) => dispatch(removeServer(payload, path)),
    forceLogout: (disconnect) => dispatch(forceLogout(disconnect))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ActionCableContainer)
);
