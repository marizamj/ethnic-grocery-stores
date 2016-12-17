import React, { Component } from 'react';

const firebase = require('firebase');

window.firebase = firebase;

class Header extends Component {
  state ={
    searchValue: '',
    matches: []
  };

  componentWillUpdate(_, nextState) {
    if (nextState.searchValue !== this.state.searchValue) {
      let matches;

      if (!nextState.searchValue) {
        matches = [];

      } else {
        const regExp = new RegExp(nextState.searchValue, 'gi');

        matches = this.props.stores.filter(store =>
          store.title.match(regExp) || store.adress.match(regExp));
      }

      this.setState({ matches });
    }
  }

  render() {
    return <div className="header">
      <div className="search">
        <div className="search-pic"></div>
        <input type="text"
          name="search"
          ref="search"
          placeholder="Search.."
          onChange={ e => this.setState({ searchValue: e.target.value }) } />

          {
            this.state.matches.length > 0 ?
              <div className="search-matches">
                {
                  this.state.matches.map(store =>
                    <div key={store.title}
                      className="search-matches__item"
                      onClick={ e => {
                        this.props.onOpenMatched(store);
                        this.setState({ matches: [], searchValue: '' });
                        this.refs.search.value = '';
                      }}>
                      <span className="blue-color">{ store.title }</span>, { store.adress }
                      </div>)
                }
              </div>
              : ''
          }

      </div>

      {
        this.props.user.email ?
          <div className="avatar"
            style={{ backgroundImage: `url(${this.props.user.photoURL || ''})` }}
            onClick={this.props.onAvaClick}>
            <div className="popup"
              style={{ visibility: this.props.popup }}>
              <div className="popup-name">{ this.props.user.displayName }</div>
              <div className="popup-sign-out" onClick={ () => {
                this.props.onLogout();
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
        this.props.user.email ?
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
