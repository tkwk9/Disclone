import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/session_actions';
import LoadingScreen from './loading_screen/loading_screen';
import ActionCableContainer from '../../actioncable/action_cable_container';
import MainNavContainer from './main_nav_container/main_nav_container';
import SubNavContainer from './sub_nav_container/sub_nav_container';
import ContentContainer from './content_container/content_container';
import {processPath} from '../../util/route_util';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.contentContainer = <div></div>;
  }

  componentWillReceiveProps(newProps) {
    if (newProps.sessionPayloadReceived) this.handlePath(newProps);
  }

  handlePath(newProps) {
    const [path, serverId, channelId] = processPath(newProps.location.pathname, newProps.dmList, newProps.servers);
    if (newProps.location.pathname !== path){
      newProps.history.push(path);
      return;
    }
    this.subNavContainer =
      <SubNavContainer
        mode={serverId} messageableId={channelId} />;
    this.contentContainer =
      <ContentContainer
        mode={serverId} messageableId={channelId} />;
  }

  render(){
    return (
      <div id="main-page">
        <ActionCableContainer />
        <LoadingScreen
          sessionPayloadReceived={this.props.sessionPayloadReceived} />
        <MainNavContainer />
        {this.subNavContainer}
        {this.contentContainer}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sessionPayloadReceived: state.ui.sessionPayloadReceived,
    dmList: Object.keys(state.entities.directMessages),
    servers: state.entities.servers
  };
};

const mapDispatchToProps = (dispatch, ownState) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainPage)
);
