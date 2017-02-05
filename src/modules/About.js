import React, { Component } from 'react';

class About extends Component {
  render() {
    return <div className="modal-window">
      <div className="modal-window__title">About this project</div>
      <div className="modal-window__close" onClick={() => {
        this.props.onClose();
      }}>&#10005;</div>

      <div className="modal-window__text">
        Hi there! My name is Marie and I created this app because
        I live in Amsterdam and really love trying and cooking new foods.
      </div>
      <div className="modal-window__text">
        If you share my passion and know some cool place
        which is not on this map, please login via Google account
        and fill the form with it.
      </div>
      <div className="modal-window__text">
        I created this project while learning how to code.
        It is using <a target="_blank" href="https://facebook.github.io/react/">React</a> to render the UI
        and <a target="_blank" href="https://firebase.google.com/">Firebase</a> to store data.
        You also can find (and star <span className="yellow">&#9733;</span>) it
        on my <a target="_blank" href="https://github.com/marizamj/ethnic-grocery-stores"> Github page</a>.
      </div>
    </div>
  }
}

export default About;
