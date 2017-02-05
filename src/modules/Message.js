import React, { Component } from 'react';
import '../css/Message.css';

class Message extends Component {
  render() {
    let classes;

    if (this.props.msg.show === 'fade') {
      classes = 'message transition-opacity';
    } else if (this.props.msg.show) {
      classes = 'message';
    } else {
      classes = 'hidden';
    }

    return <div className={classes}>
      { this.props.msg.text }
    </div>
  }
}

export default Message;
