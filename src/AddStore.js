import React, { Component } from 'react';
import './ModalWindow.css';

class AddStore extends Component {
  state = {
    storeTypes: this.props.storeTypes.map(store => {
      return {
        ...store,
        checked: false
      }
    }),

    fields: {
      required: [
        { title: 'Address', caption: '', placeholder: '' },
        { title: 'Title', caption: '', placeholder: '' },
        { title: 'Type', caption: '', placeholder: '' },
        {
          title: 'other-store-type',
          caption: '(comma-separated list)',
          placeholder: 'Other..',
        }
      ],

      optional: [
        { title: 'Description', caption: '' },
        { title: 'Telephone', caption: '' },
        { title: 'Email', caption: '' },
        { title: 'Website', caption: '' },
        { title: 'Keywords', caption: '(ex. "curry, gyoza, Kewpie mayonnaise..." etc.)' }
      ]
    }
  };

  getTypesContent() {
    return this.state.storeTypes.map(store =>
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

  render() {
    return <div className="modal-window">
      <div className="modal-window__title">Add new store</div>
      <div className="modal-window__close" onClick={() => {
        this.props.onClose();
      }}>&#10005;</div>
      <div className="modal-window__caption">(<span className="req">*</span> - required fields)</div>
      <form className="modal-window__form">
        <div className="float-l left-col">
          {
            this.state.fields.required.map(field =>
              <div key={field.title}>
                {
                  field.title !== 'other-store-type' ?
                    <div className="input-label">
                      {field.title}<span className="req">*</span>
                    </div>
                    : ''
                }
                {
                  field.title === 'Type' ?
                    this.getTypesContent()
                    :
                    <input type="text"
                      name={field.title.toLowerCase()}
                      ref={field.title.toLowerCase()}
                      placeholder={field.placeholder}
                    />
                }

                {
                  field.caption ?
                    <div className="modal-window__caption">{field.caption}</div>
                    : ""
                }
              </div>
            )
          }
        </div>

        <div className="float-r right-col">
          {
            this.state.fields.optional.map(field =>
              <div key={field.title}>
                <div className="input-label">{field.title}</div>
                <input type="text"
                  name={field.title.toLowerCase()}
                  ref={field.title.toLowerCase()}
                />
                {
                  field.caption ?
                    <div className="modal-window__caption">
                      {field.caption}
                    </div>
                    : ''
                }
              </div>
            )
          }
        </div>

        <div className="btn modal-window__submit" onClick={() => {
          const checkedTypes = this.state.storeTypes.filter(store => store.checked);

          const isReqFilled =
            Boolean(this.refs.address.value) &&
            Boolean(this.refs.title.value) &&
            (checkedTypes.length > 0 || Boolean(this.refs['other-store-type'].value));

          if (isReqFilled) {
            const form = {
              address: this.refs.address.value,
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
            this.props.onClose('Thank you!');

          } else {
            console.log('not filled');
          }
        }}>Submit</div>
      </form>

    </div>
  }
}

export default AddStore;
