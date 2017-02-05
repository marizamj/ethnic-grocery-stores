import React, { Component } from 'react';
import '../css/Admin.css';

const firebase = require('firebase');

import StoreToAdd from './StoreToAdd';

const newStoresToArray = obj =>
  Object.keys(obj || {}).map(id => ({ id, store: obj[id] }));

class Admin extends Component {
  state = {
    newStores: []
  };

  componentDidMount() {
    firebase.database().ref('newStores').on('value', snapshot => {
      this.setState({
        newStores: newStoresToArray(snapshot.val())
      });
    });
  }

  render() {
    return this.props.user.email === 'marizamj@gmail.com' ?
      <div className="admin fixed">
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
                onPushStoreToFB={form => this.props.onPushStoreToFB(form) }
                onDelete={store => {
                  firebase.database().ref(`newStores/${store.id}`)
                  .remove()
                  .then(() => console.log('removed'))
                  .catch(() => console.log('failed'));
                }}
                /> )
            : ''
        }

        <div className="admin-add-type">
          <input type="text" ref="add-type" placeholder="Add new type" />
          <div className="btn admin-add-type__btn"
            onClick={ e => {
              this.props.onPushTypeToFB(this.refs['add-type'].value);
              this.refs['add-type'].value = '';
            }}>Add</div>
        </div>

      </div>
      :
      <div></div>
  }
}

export default Admin;
