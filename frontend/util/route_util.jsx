import React from 'react';
import {withRouter, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const Auth = ({component: Component, path, loggedIn}) => {
  return (<Route path={path} render={(props) => {
      return loggedIn
        ? (<Redirect to="/@me"/>)
        : (<Component {...props}/>);
    }}/>);
};

const Protected = ({component: Component, path, loggedIn}) => {
  return (<Route path={path} render={(props) => {
      return loggedIn
        ? (<Component {...props}/>)
        : (<Redirect to="/login"/>);
    }}/>);
};

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: Boolean(state.session.currentUser)
  };
};

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));

export const processPath = (currentPath, dmList, serverList, channelHash) => {
  const [serverId, channelId] = getPathArray();
  if (serverId === '@me') {
    return dmList.includes(channelId)
      ? [`/@me/${channelId}`, 'DM', channelId]
      : ['/@me', 'friends_list', null];
  } else {
    return serverList.includes(serverId)
      ? channelHash[serverId].includes(parseInt(channelId))
        ? [`/${serverId}/${channelId}`, serverId, channelId]
        : [
          `/${serverId}/${channelHash[serverId][0]}`,
          serverId,
          channelHash[serverId][0]
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
