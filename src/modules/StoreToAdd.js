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
        { edit: false, title: 'Type', value: store.type ? store.type.map(type => type.name).join(', ') : '' },
        { edit: false, title: 'Other type', value: store['other-store-type'] },
        { edit: false, title: 'Address', value: store.address },
        { edit: false, title: 'Description', value: store.description },
        { edit: false, title: 'Email', value: store.email },
        { edit: false, title: 'Website', value: store.website },
        { edit: false, title: 'Telephone', value: store.telephone },
        { edit: false, title: 'Keywords', value: store.keywords },
        { edit: false, title: 'Hours', value: 'mon: , tue: , wed: , thu: , fri: , sat: , sun:' },
        { edit: false, title: 'Lat', value: '' },
        { edit: false, title: 'Long', value: '' },
        { edit: false, title: 'Sender name', value: store.senderName },
        { edit: false, title: 'Sender email', value: store.senderEmail }
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
              <span className="admin-store-info__text">{field.title}:</span>
              {
                field.edit ?
                  <textarea
                    defaultValue={field.value || 'no info'}
                    className="admin-store-info__textarea"
                    onChange={ e => field.value = e.target.value }></textarea>
                  :
                  <div className="admin-store-info__field"
                    onClick={e => {
                      field.edit = true;
                    }}>{field.value || 'no info'}</div>
              }

            </div>
          )
        }

        <div className="btn admin-store-submit"
          onClick={ e => {
            const form = this.state.fields.reduce((result, field) => {
              result[field.title.toLowerCase()] = field.value;
              return result;
            }, {});

            form.title = this.state.store.title;
            form.hours = form.hours.split(', ').reduce( (result, day) => {
              const parts = day.split(': ');
              result[parts[0]] = parts[1];
              return result;
            }, {});
            form.latLng = { lat: Number(form.lat), lng: Number(form.long) };

            delete form.lat;
            delete form.long;
            delete form['other type'];

            this.props.onPushStoreToFB(form);
          }} >Submit</div>
        <div className="btn admin-store-delete"
          onClick={ e => this.props.onDelete(this.props.store) }>Delete</div>

      </div>

    </div>
  }
}

export default StoreToAdd;
