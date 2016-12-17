import React, { Component } from 'react';

const weekDays = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];

class Sidebar extends Component {
  state = {
    fields: [ 'Adress', 'Description', 'Email', 'Telephone', 'Keywords' ]
  };

  render() {
    const { currentStore } = this.props;

    return <div className="sidebar">
      {
        currentStore.title ?
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
              currentStore.website ?
                <div className="sidebar-store__field">
                  <span className="sidebar-store__desc">Web:</span>
                  <span className="sidebar-store__text">
                    <a href={currentStore.website} target="_blank">
                      {
                        currentStore.website.length > 20 ?
                          `${currentStore.website.slice(0, 20)}...`
                          : currentStore.website
                      }
                    </a>
                  </span>
                </div>
                : ''
            }

            {
              currentStore.hours ?
                <div className="sidebar-store__hours">
                  <span className="sidebar-store__desc">Hours: </span>
                  {
                    weekDays.map(weekDay =>
                      <span key={ weekDay } className="sidebar-store__text">
                        { weekDay }: { currentStore.hours[weekDay.toLowerCase()] }
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
