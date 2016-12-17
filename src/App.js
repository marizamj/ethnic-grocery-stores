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
import Sidebar from './Sidebar';
import Admin from './Admin';
import Message from './Message';

const toArrayStores = obj =>
  Object.keys(obj || {}).map(id => ({ id, ...obj[id] }));

const toArrayTypes = obj =>
  Object.keys(obj || {})
  .map(id => ({ id, name: obj[id] }))
  .sort((a, b) => +(a.name > b.name) || +(a.name === b.name) - 1);

class App extends Component {
  state = {
    'add-store': false,
    stores: [],
    storeTypes: [],
    currentStore: {},
    user: { email: '' },
    token: null,
    filter: 'Show all',
    message: {
      show: false,
      text: ''
    },
    height: 0
  };

  componentDidMount() {
    firebase.database().ref('storeTypes').on('value', snapshot => {
      this.setState({
        storeTypes: toArrayTypes(snapshot.val())
      });
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: { email: '' } });
      }
    });

    firebase.database().ref('stores').on('value', snapshot => {
      this.setState({
        stores: toArrayStores(snapshot.val())
      });
    });
  }

  componentDidUpdate() {
    if (this.state.height !== document.body.scrollHeight) {
      this.setState({ height: document.body.scrollHeight });
    }
  }

  render() {
    return (
      <div onClick={e => {
        if (!e.target.classList.contains('popup-name') && !e.target.classList.contains('avatar')) {
          this.setState({ popup: 'hidden' });
        }
      }}>

        <Header onLogin={ (user, token) => {
          this.setState({ user, token });
        }} onLogout={ () => {
          firebase.auth().signOut().then(() => {
            this.setState({ user: { email: '' } });
          }, error => {
            console.log(error);
          });
        }} onAvaClick={ () => {
          this.setState({ popup: 'visible' });
        }} onAddStore={ () => {
          this.setState({ 'add-store': true });
        }} onFilterChange={ e => {
          this.setState({ filter: e.target.value });
        }} onOpenMatched={ store => {
          this.setState({ currentStore: store });
        }}
        popup={this.state.popup}
        user={this.state.user} token={this.state.token}
        stores={this.state.stores}
        storeTypes={this.state.storeTypes} />

        <Sidebar currentStore={this.state.currentStore} />

        <GMap filter={this.state.filter}
          onOpenStore={ store => {
            this.setState({ currentStore: store });
          }} currentStore={this.state.currentStore} />

        {
          this.state['add-store'] ?
            <div className="map-screen" style={ { height: this.state.height } }></div>
            : ''
        }

        <Message ref="msg" msg={this.state.message} />

        {
          this.state['add-store'] ?
            <AddStore onSubmit={form => {
              firebase.database().ref('newStores').push({
                ...form,
                senderName: this.state.user.displayName,
                senderEmail: this.state.user.email
              });
            }} onClose={msg => {
              this.setState({ 'add-store': false });

              if (msg) {
                this.setState({ message: { show: true, text: msg } });

                setTimeout(() => {
                  this.setState({ message: { show: 'fade', text: msg } });
                  setTimeout(() => {
                    this.setState({ message: { show: false, text: '' } });
                  }, 1000);
                }, 2000);
              }

            }} storeTypes={this.state.storeTypes} />
            : ''
        }

        <Admin user={this.state.user}
          onPushStoreToFB={ form => {
            firebase.database().ref('stores').push(form);

          }} onPushTypeToFB={ value => {
            if (value) {
              firebase.database().ref('storeTypes').push(value);
            } else {
              console.log('no value to push');
            }
          }} />
      </div>
    );
  }
}

export default App;
