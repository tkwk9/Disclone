import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import MemberItem from './member_item';

const MembersList = props => {
  const onlineList = [], offlineList = [];
  props.membersList.forEach ((member) => {
    member.online
      ? onlineList.push(<MemberItem key={member.id} member={member} />)
      : offlineList.push(<MemberItem key={member.id} member={member} />);
  });

  return (
    <div className="members-list">
      <ul>
        <div className='members-header'>ONLINE - {onlineList.length}</div>
        {onlineList}
        <div className='members-header'>OFFLINE - {offlineList.length}</div>
        {offlineList}
      </ul>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const directMessages = Object.values(state.entities.directMessages);
  const membersList = state.entities.servers[ownProps.serverId].membersIds.map( id => {
    const member = state.entities.users[id];
    member.dm = directMessages.find((dm) => dm.recipientId === member.id);
    return member;
  });

  return {
    membersList: membersList,
  };
};

export default withRouter(
  connect(mapStateToProps, null)(MembersList)
);
