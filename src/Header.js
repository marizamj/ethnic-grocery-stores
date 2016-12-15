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
    return <div className="header">
      <div className="search">
        <div className="search-pic"
          onClick={e => {

          }}>
        </div>
        <input type="text" name="search" placeholder="Search.." />
      </div>

      {
        this.state.user ?
          <div className="avatar"
            style={{ backgroundImage: `url(${this.state.user.photoURL || ''})` }}
            onClick={this.props.onAvaClick}>
            <div className="popup"
              style={{ visibility: this.props.popup }}>
              <div className="popup-name">{ this.state.user.displayName }</div>
              <div className="popup-sign-out" onClick={ () => {
                firebase.auth().signOut().then(() => {
                  this.setState({ user: null });
                }, error => {
                  console.log(error);
                });
              }}>Sign out</div>
              </div>
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

      {
        this.state.user ?
          <div className="add-store" onClick={() => {
            this.props.onAddStore();
          }}>Add store</div>
          :
          ''
      }

      <select className="filter" onChange={ e => {
        this.props.onFilterChange(e);
      }}>
        <option value="Show all" default>Show all</option>
        {
          this.props.storeTypes ?
            this.props.storeTypes.map(store =>
              <option value={store.name} key={store.id}>{store.name}</option>)
            :
            ''
        }
      </select>
    </div>
  }
}

export default Header;
