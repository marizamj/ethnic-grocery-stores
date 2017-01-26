import React, { Component } from 'react';
import './Sidebar.css';

const weekDays = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];

class StoreInfo extends Component {
  state = {
    store: this.props.store,
    fields: [ 'Address', 'Description', 'Email', 'Telephone', 'Keywords' ]
  };

  componentWillReceiveProps({ store }) {
    this.setState({ store });
  }

  render() {
    return <div className="sidebar-store">

      <div className="sidebar-store__name">
        {this.state.store.title}<br />
      </div>

      <div className="sidebar-store__type">{this.state.store.type}</div>

      {
        this.state.fields.map(field =>
          this.state.store[field.toLowerCase()] ?
            <div key={field} className="sidebar-store__field">
              <span className="sidebar-store__desc">{field}:</span>
              <span className="sidebar-store__text">{this.state.store[field.toLowerCase()]}</span>
            </div>
          : null
        )
      }

      {
        this.state.store.website ?
          <div className="sidebar-store__field">
            <span className="sidebar-store__desc">Web:</span>
            <span className="sidebar-store__text">
              <a href={this.state.store.website} target="_blank">
                {
                  this.state.store.website.length > 20 ?
                    `${this.state.store.website.slice(0, 20)}...`
                    : this.state.store.website
                }
              </a>
            </span>
          </div>
          : null
      }

      {
        this.state.store.hours ?
          <div className="sidebar-store__hours">
            <span className="sidebar-store__desc">Hours: </span>
            {
              weekDays.map(weekDay =>
                <span key={ weekDay } className="sidebar-store__text">
                  { weekDay }: { this.state.store.hours[weekDay.toLowerCase()] }
                </span>
              )
            }
          </div>
        : null
      }

    </div>
  }
}

export default StoreInfo;
