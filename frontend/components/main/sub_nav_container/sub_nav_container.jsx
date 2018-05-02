import React from 'react';
import SubNavContent from './child_components/sub_nav_content';
import SubNavHeader from './child_components/sub_nav_header';
import SubNavFooter from './child_components/sub_nav_footer';
import ServerPopup from './child_components/server_popup';


export default (props) => {
  return (
    <div className="sub-nav">
      <SubNavHeader />
      <ServerPopup />
      <SubNavContent />
      <SubNavFooter />
    </div>
  );
};
