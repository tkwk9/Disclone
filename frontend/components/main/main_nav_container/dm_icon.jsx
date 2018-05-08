import React from 'react';
import {withRouter, Link} from 'react-router-dom';

class DmIcon extends React.Component {
  constructor(props) {
    super(props);
    this.dmSelectorClass = this.props.dm.unreadCount > 0 || 'new';
  }

  componentWillReceiveProps(newProps) {
    this.dmSelectorClass = this.dmSelectorClass === 'new'
      ? newProps.dm.unreadCount > 0 ? true : 'new'
      : newProps.dm.unreadCount > 0;
  }

  render() {
    return (
        <Link className={`selector dm-selector ${this.props.dm.unreadCount > 0}`}  to={`/@me/${this.props.dm.id}`}>
          <div className={`dm-icon-wrapper ${this.dmSelectorClass}`}>
            <div className='user-img'>
              <div className='image-holder'>
                <img src={this.props.dm.recipient.imgURL}></img>
              </div>
              <div className={`unreadCounter`}>{this.props.dm.unreadCount}</div>
            </div>
          </div>
        </Link>
    );
  }
}

export default withRouter(DmIcon);
