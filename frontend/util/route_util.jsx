import React from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Auth = ({component: Component, path, loggedIn}) => (
  <Route path={path} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/@me" />
    )
  )}/>
);

const Protected = ({component: Component, path, loggedIn}) => {
  return (
    <Route path={path} render={(props) => {
        return loggedIn ? (
          <Component {...props}/>
        ) : (
          <Redirect to="/login"/>
        );
    }}/>
  );
};

const mapStateToProps = (state, ownProps )=> {
  return {
    path: ownProps.path,
    dm_list: Object.keys(state.entities.directMessages),
    loggedIn: Boolean(state.session.currentUser)
  };
};

export const AuthRoute = withRouter(
  connect(mapStateToProps, null)(Auth)
);

export const ProtectedRoute = withRouter(
  connect(mapStateToProps, null)(Protected)
);

export const processPath = (currentPath, dmList, serversArray, channelsHash) => {
  let pathArray = pathToArray(currentPath);

  if (pathArray.length === 0 || pathArray.length > 2) {
    return ['/@me','friends_list', null];
  }
  else if (pathArray[0] === '@me'){
    if (pathArray[1] === undefined){
      return ['/@me','friends_list', null];
    } else {
      if (dmList.includes(pathArray[1])){
        return ['/@me/' + pathArray[1],'DM', pathArray[1]];
      } else {
        return ['/@me','friends_list', null];
      }
    }
  } else {
    if (serversArray.includes(pathArray[0])){
      if (channelsHash[pathArray[0]].includes(parseInt(pathArray[1]))){
        return [ `/${pathArray[0]}/${pathArray[1]}`,pathArray[0], pathArray[1]];
      } else {
        return [ `/${pathArray[0]}/${channelsHash[pathArray[0]][0]}`,pathArray[0], channelsHash[pathArray[0]][0]];
      }
    } else {
      return ['/@me','friends_list', null]; // TODO: handle servers
    }
  }
};

const pathToArray = (path) => {
  let pathArray = [];
  path.split('/').forEach((el) => {
    if (el !== "") {
      pathArray.push(el);
    }
  });
  return pathArray;
};
