import React, { Component } from 'react';

const firebase = require('firebase');

import StoreToAdd from './StoreToAdd';

const newStoresToArray = obj =>
  Object.keys(obj || {}).map(id => ({ id, store: obj[id] }));

class Admin extends Component {
  state = {
    user: { email: '' }
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: { email: '' } });
      }
    });

    firebase.database().ref('newStores').on('value', snapshot => {
      this.setState({
        newStores: newStoresToArray(snapshot.val())
      });
    });
  }

  componentDidUpdate() {
    // console.log(this.state.newStores);
  }

  render() {
    return this.state.user.email === 'marizamj@gmail.com' ?
      <div className="admin">
        <div className="arrow" onClick={ e => {
          e.target.classList.toggle('arrow-opened');
          e.target.parentNode.classList.toggle('admin-opened');
        }}></div>

        <div className="admin-title">Recently added stores</div>

        {
          this.state.newStores ?
            this.state.newStores.map(store =>
              <StoreToAdd key={store.id}
                store={store}
                onSubmit={form => console.log("coming soon") }
                onDelete={store => {
                  firebase.database().ref(`newStores/${store.id}`)
                  .remove()
                  .then(() => console.log('removed'))
                  .catch(() => console.log('failed'));
                }}
                /> )
            : ''
        }

      </div>
      :
      <div></div>
  }
}

export default Admin;
