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

  render(){
    const contentContainer = this.props.sessionPayloadReceived ? (
      <ContentContainer
        mode={this.props.mainPageMode} messageableId={this.props.channelId} />
    ) : (
      <div></div>
    );
    return (
      <div id="main-page">
        <ActionCableContainer />
        <LoadingScreen
          sessionPayloadReceived={this.props.sessionPayloadReceived} />

        <MainNavContainer />
        <SubNavContainer
          mode={this.props.mainPageMode} messageableId={this.props.channelId} />
        {contentContainer}
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    sessionPayloadReceived: state.ui.sessionPayloadReceived,
    dmList: Object.keys(state.entities.directMessages),
    servers: state.entities.servers,
    mainPageMode: state.ui.mainPageMode,
    channelId: state.ui.channelId
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
