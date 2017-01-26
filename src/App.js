import React, { Component, cloneElement } from 'react';

const firebase = require('firebase');

import { loadStoreTypes, authListener, loadStores } from './firebaseLoaders'
import Header from './Header';
import GMap from './GMap';
import Sidebar from './Sidebar';
import Admin from './Admin';
import Message from './Message';

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
    pathname: this.props.location.pathname
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

  setCurrentStore(newPath) {
    const newID = newPath.split('/')[2];

    this.setState({ currentStore: this.state.stores.find(store =>
      store.id === newID) });
  }

  componentDidMount() {
    loadStoreTypes(storeTypes => this.setState({ storeTypes }));
    authListener(user => this.setState({ user }));
    loadStores(stores => {
      this.setState({ stores });

      if (this.state.pathname.match(/^\/stores\/.+/)) {
        this.setCurrentStore(this.state.pathname);
      }
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
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  componentWillReceiveProps({ location }) {
    const prevLocation = this.props.location;

    if (prevLocation.pathname !== location.pathname) {
      this.setState({ pathname: location.pathname });

      if (location.pathname.match(/^\/stores\/.+/)) {
        this.setCurrentStore(location.pathname);
      }
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
            this.props.router.goBack();

            if (msg) {
              this.showMessage(msg);
            }
          }
        })
      }

        <Header router={this.props.router} onLogin={ (user, token) => {
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
        }}
        popup={this.state.popup}
        user={this.state.user} token={this.state.token}
        stores={this.state.stores}
        storeTypes={this.state.storeTypes} />

        <Sidebar currentStore={this.state.currentStore} />

        <GMap filter={this.state.filter}
          router={this.props.router}
          currentStore={this.state.currentStore} />

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
