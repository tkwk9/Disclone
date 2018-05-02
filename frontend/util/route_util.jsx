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
    this.handlePath(props);
    // if (props.sessionPayloadReceived)

  }

  componentWillReceiveProps(newProps) {
    // console.log(newProps.location.pathname)
    if (newProps.location.pathname !== this.props.location.pathname) this.handlePath(newProps);
  }

  handlePath(newProps) {
    const [path, mainPageMode, channelId] = processPath(newProps.location.pathname, newProps.dmList, newProps.servers);
    if (newProps.location.pathname !== path){
      newProps.history.push(path);
    } else {
      newProps.updateMainPageMode({
        mainPageMode,
        channelId
      });
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

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    sessionPayloadReceived: state.ui.sessionPayloadReceived,
    dmList: Object.keys(state.entities.directMessages),
    servers: state.entities.servers,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateMainPageMode: (mainPageMode) => dispatch(updateMainPageMode(mainPageMode))
  };
};

export const AuthRoute = connect(mapStateToProps, null)(Auth);
export const ProtectedRoute = withRouter(connect(mapStateToProps, mapDispatchToProps)(Protected));

export const processPath = (currentPath, dmList, servers) => {
  const [serverId, channelId] = getPathArray();
  if (serverId === '@me') {
    return dmList.includes(channelId)
      ? [`/@me/${channelId}`, 'DM', channelId]
      : ['/@me', 'friends_list', null];
  } else {
    return servers[serverId]
      ? servers[serverId].channelIds.includes(parseInt(channelId))
        ? [`/${serverId}/${channelId}`, serverId, channelId]
        : [
          `/${serverId}/${servers[serverId].channelIds[0]}`,
          serverId,
          servers[serverId].channelIds[0]
        ]
      : ['/@me', 'friends_list', null];
  }
  function getPathArray() {
    const pathArray = currentPath.split('/').filter(el => el !== '');
    return !pathArray.length || pathArray.length > 2
      ? ['/@me']
      : pathArray;
  }
};
