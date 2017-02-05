import React, { Component } from 'react';
import { Link } from 'react-router';

import '../css/Header.css';

const firebase = require('firebase');

class Header extends Component {
  state ={
    searchInput: '',
    matches: [],
    filter: this.props.filter,
  };

  componentWillReceiveProps({ filter }) {
    this.setState({ filter });
  }

  componentWillUpdate(_, nextState) {
    if (nextState.searchInput !== this.state.searchInput) {
      let matches;

      if (!nextState.searchInput) {
        matches = [];

      } else {
        const regExp = new RegExp(nextState.searchInput, 'gi');

        matches = this.props.stores.filter(store =>
          store.title.match(regExp) || store.address.match(regExp));
      }

      this.setState({ matches });
    }
  }

  clearSearch() {
    this.setState({ matches: [], searchInput: '' });
    this.refs.search.value = '';
  }

  searchAndClear(searchInput) {
    this.props.search(searchInput);
    this.clearSearch();
  }

  render() {
    return <div className="header fixed">
      <Link to="/"><div className="logo float-l"></div></Link>
      <input type="text"
        className="search float-l"
        name="search"
        ref="search"
        placeholder="Search.."
        onChange={ e => this.setState({ searchInput: e.target.value }) }
        onKeyUp={ e => {
          if (e.keyCode === 13) this.searchAndClear(this.state.searchInput);
        }} />

        {
          this.state.matches.length > 0 ?
            <div className="search-matches">
              {
                this.state.matches.map(store =>
                  <div key={store.title}
                    className="search-matches__item"
                    onClick={ e => {
                      this.props.router.push(`/stores/${store.id}`);
                      this.clearSearch();
                    }}>
                    <span className="blue-color">{ store.title }</span>, { store.address }
                  </div>)
              }
            </div>
            : null
        }

      <div className="search-btn float-l" onClick={ e => {
        if (this.state.searchInput !== '') {
          this.searchAndClear(this.state.searchInput);
        }
      }}></div>


      <select className="filter float-l" value={this.state.filter.toLowerCase()}
        onChange={ e => this.searchAndClear(e.target.value) }>
        <option value="show-all" default >Show all</option>
        {
          this.props.storeTypes ?
            this.props.storeTypes.map(store =>
              <option value={store.name.toLowerCase()} key={store.id} >
                {store.name}
              </option>)
              : null
        }
      </select>

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

      <div className="fb-share-btn" onClick={ () => {
        this.props.onFbShare();
      }} ></div>


      <Link to="/about" className="about">About</Link>

      {
        this.props.user.email ?
          <Link to="/add-store" className="add-store">Add store</Link>
          : null
      }

    </div>
  }
}

export default Header;
