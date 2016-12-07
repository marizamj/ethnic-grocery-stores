import React, { Component } from 'react';

const firebase = require('firebase');

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
              <div key={store.id}>
                <div className="admin-store-title"
                  onClick={ e => e.target.parentNode.children[1].classList.toggle('hidden') }
                >
                  { store.store.title }
                </div>
                <div className="admin-store-info hidden">
                  <span className="admin-store-info__text">Adress:</span>
                  <div className="admin-store-info__field"
                    onClick={ e => console.log('ololo') }>{store.store.adress}</div>
                  <div className="btn admin-store-submit">Submit</div>
                  <div className="btn admin-store-delete">Delete</div>
                </div>

              </div>
            )
            : ''
        }

      </div>
      :
      <div></div>
  }
}

export default Admin;
