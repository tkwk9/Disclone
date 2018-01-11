import React from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.content);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.content !== this.props.content;
  }

  render() {
    let youtubeId = getId(this.props.content);
    if (youtubeId === 'error') {
      return (
        <li className="message">
          {this.props.content}
        </li>
      );
    } else {
      return (
        <li className="message">
          <div style={{
              padding: "8px 8px 0 8px",
              backgroundColor: "#2f3136",
              border: "2px solid #7289da"
            }}>
            <iframe width="373" height="210" src={`//www.youtube.com/embed/${youtubeId}`} frameBorder="0" allowFullScreen />
          </div>
        </li>
      );
    }
  }
}

// export default (props) => {
//   let youtubeId = getId(props.content);
//   if (youtubeId === 'error') {
//     return (
//       <li className="message">
//         {props.content}
//       </li>
//     );
//   } else {
//     return (
//       <li className="message">
//         <div style={{
//             padding: "8px 8px 0 8px",
//             backgroundColor: "#2f3136",
//             border: "2px solid #7289da"
//           }}>
//           <iframe width="373" height="210" src={`//www.youtube.com/embed/${youtubeId}`} frameBorder="0" allowFullScreen />
//         </div>
//       </li>
//     );
//   }
// };

export default Message;


function getId(url) {
  let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  let match = url.match(regExp);

  if (match && match[2].length == 11) {
      return match[2];
  } else {
      return 'error';
  }
}
