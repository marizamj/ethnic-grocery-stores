import React, { Component, cloneElement } from 'react';

const firebase = require('firebase');

import { loadStoreTypes, authListener, loadStores } from '../helpers/firebaseLoaders';
import { facebookInit, facebookShare } from '../helpers/facebookShare';
import Header from './Header';
import GMap from './GMap';
import Sidebar from './Sidebar';
import Admin from './Admin';
import Message from './Message';

class App extends Component {
  state = {
    stores: [],
    storesToShow: [],
    storeTypes: [],
    currentStore: {},
    user: { email: '' },
    token: null,
    filter: 'show-all',
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
      store.id === newID) || {} });
  }

  setStoresToShow(newPath) {
    const searchValue = newPath === '/' ?
      'show-all'
      :
      decodeURIComponent(newPath.split('/')[2]);

    this.setState({ filter: searchValue });

    if (searchValue === 'show-all') {
      this.setState({ storesToShow: this.state.stores });
      return;
    }

    const regex = new RegExp(searchValue, 'i');

    this.setState({ storesToShow: this.state.stores.filter(store => {
      const { type, keywords, title, address } = store;
      return [ type, keywords, title, address ].some(el => el.match(regex));
    })});
  }

  search(searchValue) {
    this.props.router.push(`/search/${encodeURIComponent(searchValue)}`);
  }

  componentDidMount() {
    loadStoreTypes(storeTypes => this.setState({ storeTypes }));
    authListener(user => this.setState({ user }));
    loadStores(stores => {
      this.setState({ stores, storesToShow: stores });

      if (this.state.pathname.match(/^\/stores\/.+/)) {
        this.setCurrentStore(this.state.pathname);
      }

      if (this.state.pathname.match(/^\/search\/.+/)) {
        this.setStoresToShow(this.state.pathname);
      }
    });

    facebookInit();
  }

  componentWillReceiveProps({ location }) {
    const prevLocation = this.props.location;

    if (prevLocation.pathname !== location.pathname) {
      this.setState({ pathname: location.pathname });

      if (location.pathname.match(/^\/search\/.+/) || location.pathname === '/') {
        this.setStoresToShow(location.pathname);
      }

      if (location.pathname.match(/^\/stores\/.+/)) {
        this.setCurrentStore(location.pathname);
      } else {
        this.setCurrentStore('');
      }

      if (location.pathname.match(/^\/search?\/?.+/)) {
      }
    }
  }

  render() {
    return (
      <div onClick={ e => {
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
        }} onFbShare={ () =>  facebookShare() }
        search={this.search.bind(this)}
        {...this.state} />

        <Sidebar currentStore={this.state.currentStore}
          filter={this.state.filter}
          stores={this.state.storesToShow}
          pathname={this.state.pathname} />

        <GMap filter={this.state.filter}
          storesToShow={this.state.storesToShow}
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
