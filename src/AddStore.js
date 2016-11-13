import React, { Component } from 'react';

class AddStore extends Component {
  state = {
    storeTypes: this.props.storeTypes.map(store => {
      return {
        ...store,
        checked: false
      }
    })
  };

  render() {
    return <div className="add-store-window">
      <div className="add-store-window__title">Add new store</div>
      <form className="add-store-window__form">
        <div className="left-col">
          <div className="input-label">Adress</div>
          <input type="text" name="adress" />
          <div className="input-label">Name</div>
          <input type="text" name="name" />
          <div className="input-label">Type</div>
          {
            this.state.storeTypes.map(store =>
              <div
                style={ store.checked ? { background: '#f37e7f', color: '#fff' } : {}}
                className="store-type"
                key={store.id}>
                <input
                  type="checkbox"
                  checked={store.checked}
                  name="store-type"
                  value={store.name}
                  onChange={e => {
                    this.setState({ storeTypes: this.state.storeTypes.map(store => {
                      if (store.name === e.target.value) {
                        return { ...store, checked: !store.checked };
                      } else {
                        return store;
                      }
                    }) })
                  }} /> {store.name}
              </div>
            )
          }
          <input type="text" name="other-store-type" placeholder="Other.." />
        </div>
        <div className="right-col">
          <div className="input-label">Description</div>
          <input type="text" name="description" />
          <div className="input-label">Telephone</div>
          <input type="text" name="telephone" />
          <div className="input-label">Email</div>
          <input type="text" name="email" />
          <div className="input-label">Website</div>
          <input type="text" name="website" />
        </div>
      </form>

    </div>
  }
}

export default AddStore;
