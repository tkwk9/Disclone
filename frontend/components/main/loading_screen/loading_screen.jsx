import React from 'react';
import {connect} from 'react-redux';

const LoadingPage = props => {
  return (
    <div className={`loading-page
        ${props.sessionPayloadReceived ? "loaded" : "loading"}`}>
      <video loop autoPlay>
        <source
          src={window.staticImages.loaderVid1}
          type="video/webm">
        </source>
        <source
          src={window.staticImages.loaderVid1}
          type="video/mp4">
        </source>
      </video>
      <div>
        {props.sessionPayloadReceived ? "READY" : "CONNECTING"}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    sessionPayloadReceived: state.ui.sessionPayloadReceived,
  };
};

export default connect(mapStateToProps, null)(LoadingPage);
