import React from 'react';
import {withRouter} from 'react-router-dom';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateMainPageMode} from '../actions/ui_actions';

const Auth = ({component: Component, path, loggedIn}) => {
  return (<Route path={path} render={(props) => {
      return loggedIn
        ? (<Redirect to="/@me"/>)
        : (<Component {...props}/>);
    }}/>);
};

class Protected extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.sessionPayloadReceived) this.handlePath(newProps);
  }

  handlePath(newProps) {
    const [path, serverId, messageableId] = this.processPath(newProps);
    if (newProps.location.pathname !== path){
      newProps.history.push(path);
      return;
    }
    if (newProps.requiresStateUpdate(serverId, messageableId)) {
      newProps.updateMainPageMode({
        serverId,
        messageableId
      });
    }
  }

  processPath(newProps) {
    const [serverId, messageableId] = getPathArray();
    if (serverId === '@me') {
      return newProps.dmList.includes(messageableId)
        ? [`/@me/${messageableId}`, 'DM', messageableId]
        : ['/@me', 'friends_list', null];
    } else {
      return newProps.servers[serverId]
        ? newProps.servers[serverId].channelIds.includes(parseInt(messageableId))
          ? [`/${serverId}/${messageableId}`, serverId, messageableId]
          : [
            `/${serverId}/${newProps.servers[serverId].channelIds[0]}`,
            serverId,
            newProps.servers[serverId].channelIds[0]
          ]
        : ['/@me', 'friends_list', null];
    }
    function getPathArray() {
      const pathArray = newProps.location.pathname.split('/').filter(el => el !== '');
      return !pathArray.length || pathArray.length > 2
        ? ['/@me']
        : pathArray;
    }
  }

  render() {
    const Component = this.props.component;
    return (<Route path={this.props.path} render={(props) => {
        return this.props.loggedIn
          ? (<Component {...props}/>)
          : (<Redirect to="/login"/>);
      }}/>);
  }
}

const authMapStateToProps = (state, ownProps) => {
  return {
    loggedIn: Boolean(state.session.currentUser),

  };
};

const protectedMapStateToProps = (state, ownProps) => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    sessionPayloadReceived: state.ui.sessionPayloadReceived,
    dmList: Object.keys(state.entities.directMessages),
    servers: state.entities.servers,
    requiresStateUpdate: (serverId, messageableId) => {
      return !(serverId === state.ui.serverId && messageableId === state.ui.messageableId);
    }
  };
};

const protectedMapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateMainPageMode: (mainPageMode) => dispatch(updateMainPageMode(mainPageMode))
  };
};

export const AuthRoute = connect(authMapStateToProps, null)(Auth);
export const ProtectedRoute = withRouter(connect(protectedMapStateToProps, protectedMapDispatchToProps)(Protected));
