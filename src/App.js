import React, { Component, cloneElement } from 'react';

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

  showMessage(text) {
    this.setState({ message: { show: true, text } });

    setTimeout(() => {
      this.setState({ message: { show: 'fade', text } });
      setTimeout(() => {
        this.setState({ message: { show: false, text: '' } });
      }, 1000);
    }, 2000);
  }

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

    window.fbAsyncInit = function() {
        window.FB.init({
            appId      : '702167243294973',
            xfbml      : true,
            version    : 'v2.8'
        });

        window.FB.XFBML.parse();
        window.FB.AppEvents.logPageView();
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
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

      {
        this.props.children && cloneElement(this.props.children, {
          storeTypes: this.state.storeTypes,

          onAddStoreSubmit: form => {
            firebase.database().ref('newStores').push({
              ...form,
              senderName: this.state.user.displayName,
              senderEmail: this.state.user.email
            });
          },

          onClose: msg => {
            this.props.router.push('/');

            if (msg) {
              this.showMessage(msg);
            }
          }
        })
      }

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
        }} onFbShare={ () => {
          window.FB.ui({
            hashtag: '#EthnicGroceryStores',
            method: 'share',
            href: 'https://ethnic-grocery-stores.firebaseapp.com/',
          }, function(response){});
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

        <Message ref="msg" msg={this.state.message} />

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
