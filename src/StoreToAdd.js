import React, { Component } from 'react';

class StoreToAdd extends Component {
  state ={
    store: this.props.store.store,
    id: this.props.store.id,
    fields: [],
    edit: []
  };

  componentDidMount() {
    this.setState({
      fields: [
        { edit: false, title: 'Type:', content: this.state.store.type.map(type => type.name).join(', ') },
        { edit: false, title: 'Other type:', content: this.state.store['other-store-type'] },
        { edit: false, title: 'Adress:', content: this.state.store.adress },
        { edit: false, title: 'Description:', content: this.state.store.description },
        { edit: false, title: 'Email:', content: this.state.store.email },
        { edit: false, title: 'Website:', content: this.state.store.website },
        { edit: false, title: 'Telephone:', content: this.state.store.telephone }
      ]
    });
  }

  render() {
    return <div>
      <div className="admin-store-title"
        onClick={ e => e.target.parentNode.children[1].classList.toggle('hidden') }>
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
