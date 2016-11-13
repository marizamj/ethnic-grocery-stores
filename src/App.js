import React, { Component } from 'react';

const firebase = require('firebase');

var config = {
  apiKey: "AIzaSyDyRukiPIej168d6elewuZpF7VR4P0ueWU",
  authDomain: "ethnic-grocery-stores.firebaseapp.com",
  databaseURL: "https://ethnic-grocery-stores.firebaseio.com",
  storageBucket: "ethnic-grocery-stores.appspot.com",
  messagingSenderId: "131961135840"
};
firebase.initializeApp(config);

import Header from './Header';
import GMap from './GMap';
import AddStore from './AddStore';
// import StoreInfo from './StoreInfo';

const toArray = (obj) =>
  Object.keys(obj || {}).map(id => ({ id, name: obj[id] }));

class App extends Component {
  state = {
    storeTypes: [],
    user: null,
    token: null,
    'add-store': false
  };

  componentDidMount() {
    firebase.database().ref('storeTypes').on('value', snapshot => {
      this.setState({
        storeTypes: toArray(snapshot.val())
      });
    });
  }

  render() {
    return (
      <div onClick={e => {
        if (!e.target.classList.contains('popup-name') && !e.target.classList.contains('avatar')) {
          this.setState({ popup: 'hidden' });
        }
      }}>
        {/* <button onClick={ () => {
          firebase.database().ref('stores').push({
            title: Math.random()
          });
        }}>
          Go
        </button>
        <ul>
        {
          this.state.stores.map(store =>
            <li key={ store.id }>{ store.title }</li>
          )
        }
        </ul> */}
        <Header onLogin={ (user, token) => {
          this.setState({ user, token });
          console.log(user);
        }} onAvaClick={ () => {
          this.setState({ popup: 'visible' });
        }} onAddStore={ () => {
          this.setState({ 'add-store': true });
        }}
        popup={this.state.popup}
        user={this.state.user} token={this.state.token} />
        <GMap />
        {
          this.state['add-store'] ?
            <AddStore storeTypes={this.state.storeTypes} />
            :
            ''
        }
      </div>
    );
  }
}

export default App;
