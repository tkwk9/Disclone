import React from 'react';
import Message from './message';

export default (props) => {
  let mainMessage = props.messages[0];
  if (props.messages.length > 0) {
    return (
      <div className="message-wrapper">
        <div className={`date ${props.showDate}`}>
          {mainMessage.timestampObject.date}
        </div>
        <div classNmae='timeStamp'>

        </div>
        <div className="username">{mainMessage.author}</div>
        <ul className="">
          {props.messages.map(
            (msg) => <Message key={msg.id} content={msg.content}/>
          )}
        </ul>
      </div>
    );
  } else {
    return <div className="messages-wrapper"></div>;
  }
};
