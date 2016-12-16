import React, { Component } from 'react';

class StoreToAdd extends Component {
  state ={
    store: this.props.store.store,
    id: this.props.store.id,
    fields: [],
    edit: []
  };

  componentDidMount() {
    const { store } = this.state;

    this.setState({
      fields: [
        { edit: false, title: 'Type:', content: store.type.map(type => type.name).join(', ') },
        { edit: false, title: 'Other type:', content: store['other-store-type'] },
        { edit: false, title: 'Adress:', content: store.adress },
        { edit: false, title: 'Description:', content: store.description },
        { edit: false, title: 'Email:', content: store.email },
        { edit: false, title: 'Website:', content: store.website },
        { edit: false, title: 'Telephone:', content: store.telephone },
        { edit: false, title: 'Hours:', content: '' },
        { edit: false, title: 'Lat:', content: '' },
        { edit: false, title: 'Long:', content: '' }
      ]
    });
  }

  render() {
    return <div>
      <div className="admin-store-title"
        onClick={ e => {
          e.target.parentNode.children[1].classList.toggle('hidden');
          e.target.classList.toggle('admin-store-title__open');
        }}>
        { this.state.store.title }
      </div>

      <div className="admin-store-info hidden">

        {
          this.state.fields.map(field =>
            <div key={field.title}>
              <span className="admin-store-info__text">{field.title}</span>
              {
                field.edit ?
                  <textarea
                    defaultValue={field.content || 'no info'}
                    className="admin-store-info__textarea"></textarea>
                  :
                  <div className="admin-store-info__field"
                    onClick={e => {
                      field.edit = true;
                    }}>{field.content || 'no info'}</div>
              }

            </div>
          )
        }

        <div className="btn admin-store-submit"
          onClick={ e => {
            const form = {

            };

            this.props.onSubmit(form);
          }} >Submit</div>
        <div className="btn admin-store-delete"
          onClick={ e => this.props.onDelete(this.props.store) }>Delete</div>

      </div>

    </div>
  }
}

export default StoreToAdd;
