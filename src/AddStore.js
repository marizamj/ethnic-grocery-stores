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
      <div className="add-store-window__close" onClick={() => {
        this.props.onClose();
      }}>&#10005;</div>
      <div className="add-store-window__text">(<span className="req">*</span> - required fields)</div>
      <form className="add-store-window__form">
        <div className="float-l left-col">
          <div className="input-label">Adress<span className="req">*</span></div>
          <input type="text" name="adress" ref="adress" />
          <div className="input-label">Title<span className="req">*</span></div>
          <input type="text" name="title" ref="title" />
          <div className="input-label">Type<span className="req">*</span></div>
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
          <input type="text" name="other-store-type" ref="other-store-type" placeholder="Other.." />
          <div className="add-store-window__text">(comma-separated list)</div>
        </div>
        <div className="float-r left-col right-col">
          <div className="input-label">Description</div>
          <input type="text" name="description" ref="description" />
          <div className="input-label">Telephone</div>
          <input type="text" name="telephone" ref="telephone" />
          <div className="input-label">Email</div>
          <input type="text" name="email" ref="email" />
          <div className="input-label">Website</div>
          <input type="text" name="website" ref="website" />
          <div className="input-label">Keywords</div>
          <input type="text" name="keywords" ref="keywords" />
          <div className="add-store-window__text">(ex. "curry, gyoza, Kewpie mayonnaise..." etc.)</div>
        </div>

        <div className="btn add-store-window__submit" onClick={() => {
          const checkedTypes = this.state.storeTypes.filter(store => store.checked);

          const isReqFilled =
            Boolean(this.refs.adress.value) &&
            Boolean(this.refs.title.value) &&
            (checkedTypes.length > 0 || Boolean(this.refs['other-store-type'].value));

          if (isReqFilled) {
            const form = {
              adress: this.refs.adress.value,
              title: this.refs.title.value,
              type: checkedTypes,
              'other-store-type': this.refs['other-store-type'].value,
              description: this.refs.description.value,
              telephone: this.refs.telephone.value,
              email: this.refs.email.value,
              website: this.refs.website.value,
              keywords: this.refs.keywords.value
            }

            this.props.onSubmit(form);

          } else {
            console.log('not filled');
          }
        }}>Submit</div>
      </form>

    </div>
  }
}

export default AddStore;
