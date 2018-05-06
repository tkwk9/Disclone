import React from 'react';
import * as svg from '../../../../../util/svg';

export default props => {
  return isNaN(props.type)
    ? <div className="head">
        <div className="username">
          @ <span>{props.target.username}</span>
          <div className={
              `online-indicator${props.target.online ? " online" : ""}`
            }></div>
        </div>
      </div>
    : <div className="head">
        {svg.hashtag()}
        <div className="channel-name">{props.target.name}</div>
      </div>;
};
