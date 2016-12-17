import React, { Component } from 'react';

const weekDays = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];

class Sidebar extends Component {
  state = {
    fields: [ 'Adress', 'Description', 'Website', 'Email', 'Telephone' ]
  };

  render() {
    const { currentStore } = this.props;

    return <div className="sidebar">
      {
        currentStore ?
          <div className="sidebar-store">
            <div className="sidebar-store__name">
              {currentStore.title}<br />
            </div>
            <div className="sidebar-store__type">{currentStore.type}</div>

            {
              this.state.fields.map(field =>
                currentStore[field.toLowerCase()] ?
                  <div key={field} className="sidebar-store__field">
                    <span className="sidebar-store__desc">{field}:</span>
                    <span className="sidebar-store__text">{currentStore[field.toLowerCase()]}</span>
                  </div>
                : ''
              )
            }

            {
              currentStore.hours ?
                <div className="sidebar-store__hours">
                  <span className="sidebar-store__desc">Hours: </span>
                  {
                    Object.keys(currentStore.hours).map( (day, i) =>
                      <span key={ weekDays[i] } className="sidebar-store__text">
                        { weekDays[i] }: { currentStore.hours[day] }
                      </span>
                    )
                  }
                </div>
              : ''
            }
          </div>
          :
          <div className="sidebar-placeholder">Store info will be here</div>
      }
    </div>
  }
}

export default Sidebar;
