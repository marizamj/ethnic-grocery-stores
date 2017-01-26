import React, { Component } from 'react';
import './Sidebar.css';

const weekDays = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];

class StoreInfo extends Component {
  state = {
    store: this.props.store,
    fields: [
      'Address',
      'Description',
      'Email',
      'Telephone',
      'Website',
      'Hours',
      'Keywords'
    ]
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
        this.state.fields.map(field => {
          let result = null;

          if (!this.state.store[field.toLowerCase()]) return result;

          switch (field) {
            case 'Website':
              result = (<div key={field} className="sidebar-store__field">
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
              </div>);

              break;

            case 'Telephone':
              result = (<div key={field} className="sidebar-store__field">
                <span className="sidebar-store__desc">Telephone:</span>
                <span className="sidebar-store__text">
                  <a href={`tel:+${this.state.store.telephone}`}>{this.state.store.telephone}</a>
                </span>
              </div>);

              break;

            case 'Email':
              result = (<div key={field} className="sidebar-store__field">
                <span className="sidebar-store__desc">Email:</span>
                <span className="sidebar-store__text">
                  <a href={`mailto:+${this.state.store.email}`}>{this.state.store.email}</a>
                </span>
              </div>);

              break;

            case 'Hours':
              result = (<div key={field} className="sidebar-store__hours">
                <span className="sidebar-store__desc">Hours: </span>
                <table className="hours-table"><tbody>
                {
                  weekDays.map(weekDay =>
                    <tr key={ weekDay }>
                      <td key={ Math.random() }>
                        { weekDay }:
                      </td>
                      <td key={ Math.random() }>
                        { this.state.store.hours[weekDay.toLowerCase()] }
                      </td>
                    </tr>
                  )
                }
                </tbody></table>
              </div>);

              break;

            default:
              result = (<div key={field} className="sidebar-store__field">
                <span className="sidebar-store__desc">{field}:</span>
                <span className="sidebar-store__text">
                  {this.state.store[field.toLowerCase()]}
                </span>
              </div>);
          }

          return result;
        })
      }

    </div>
  }
}

export default StoreInfo;
