import React, { Component } from 'react';

const firebase = require('firebase');

window.firebase = firebase;

class Header extends Component {
  state = {
    user: this.props.user
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  render() {
    // firebase.auth().onAuthStateChanged(user => {
    //   this.setState({ user });
    // });

    return <div className="header">
      <button className="search-btn"></button>
      <input type="text" name="search" placeholder="Search.." />

      {
        this.state.user ?
          <div className="avatar"
            style={{ backgroundImage: `url(${this.state.user.photoURL || ''})` }}
            onClick={this.props.onAvaClick}>
            <div className="logout-popup"
              onClick={ () => {
                firebase.auth().signOut().then(() => {
                  this.setState({ user: null });
                }, error => {
                  console.log(error);
                });
              }}
              style={{ visibility: this.props.popup }}>Sign out</div>
          </div>
          :
          <div className="google-login" onClick={ () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            firebase.auth().signInWithPopup(provider).then(result => {
              const token = result.credential.accessToken;
              const user = result.user;
              this.props.onLogin(user, token);
            });
          }}></div>
      }

      <select className="filter">
        <option value="all" default>Show all</option>
        <option value="asian">Asian</option>
      </select>

    </div>
  }
}

export default Header;
