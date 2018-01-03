import React from 'react';
import Message from './message';

export default (props) => {
  let mainMessage = props.messages[0];
  if (props.messages.length > 0) {
    return (
      <div className="message-wrapper">
        <div className={`date ${props.showDate}`}>
          <span>
            {`  ${mainMessage.timestampObject.readableDate}  `}
          </span>
        </div>
        <div className="content-holder">
          <div className='user-img'>

          </div>
          <div className="messages-container">
            <div className='header'>
              <div className="username">{mainMessage.author}</div>
              <div className='time-stamp'>
                {mainMessage.timestampObject.formattedDate}{" "}
                {mainMessage.timestampObject.time}
              </div>
            </div>
            <ul>
              {props.messages.map(
                (msg) => <Message key={msg.id} content={msg.content}/>
            )}
          </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="messages-wrapper"></div>;
  }
};
