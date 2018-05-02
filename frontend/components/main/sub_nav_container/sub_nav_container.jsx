import React from 'react';
import SubNavContent from './child_components/sub_nav_content';
import SubNavHeader from './child_components/sub_nav_header';
import SubNavFooter from './child_components/sub_nav_footer';
import ServerDropdown from './child_components/server_dropdown';
import {withRouter} from 'react-router-dom';

const SubNavContainer = props => {
  return (
    <div className="sub-nav">
      <SubNavHeader />
      <ServerDropdown />
      <SubNavContent />
      <SubNavFooter />
    </div>
  );
};

export default withRouter(SubNavContainer);
