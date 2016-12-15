import React, { Component } from 'react';

class Message extends Component {
  render() {
    return <div className={
      this.props.msg.show ?
        'message'
        :
        'message transition-opacity'
    }>
      { this.props.msg.text }
    </div>
  }
}

export default Message;
