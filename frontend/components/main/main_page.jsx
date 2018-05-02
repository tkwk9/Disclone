import React from 'react';
import {connect} from 'react-redux';
import {logout} from '../../actions/session_actions';
import LoadingScreen from './loading_screen/loading_screen';
import ActionCableContainer from '../../actioncable/action_cable_container';
import MainNavContainer from './main_nav_container/main_nav_container';
import SubNavContainer from './sub_nav_container/sub_nav_container';
import ContentContainer from './content_container/content_container';
import {withRouter} from 'react-router-dom';


class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.contentContainer = <div></div>;
  }

  render(){
    const contentContainer = this.props.sessionPayloadReceived ? (
      <ContentContainer/>
    ) : (
      <div></div>
    );
    return (
      <div id="main-page">
        <ActionCableContainer />
        <LoadingScreen
          sessionPayloadReceived={this.props.sessionPayloadReceived} />
        <MainNavContainer />
        <SubNavContainer/>
        {contentContainer}
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    sessionPayloadReceived: state.ui.sessionPayloadReceived,
  };
};

const mapDispatchToProps = (dispatch, ownState) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));
