import React from 'react';
import Message from './message';

export default (props) => {
  if (props.messages.length > 0) {
    return (
      <div className="message-wrapper">
        <div className={`date ${props.showDate}`}>
          {props.messages[0].timestampObject.date}
        </div>
        <div className="username">{props.messages[0].author}</div>
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
