import React, { Component } from 'react';

class Sidebar extends Component {
  render() {
    // const {
    //   name,
    //   type,
    //   adress,
    //   description,
    //   website,
    //   email,
    //   telephone,
    //   hours } = this.props.currentStore;

    return <div className="sidebar">
      {
        this.props.currentStore ?
          <div className="sidebar-store">
            <div className="sidebar-store__name">
              {this.props.currentStore.name}<br />
            </div>
            <div className="sidebar-store__type">{this.props.currentStore.type}</div>
            <div className="sidebar-store__adress">
              <span className="sidebar-store__desc">Adress: </span>
              <span className="sidebar-store__text">{this.props.currentStore.adress}</span>
            </div>

            {
              this.props.currentStore.description ?
                <div className="sidebar-store__description">
                  <span className="sidebar-store__desc">Description: </span>
                  <span className="sidebar-store__text">{this.props.currentStore.description}</span>
                </div>
              : ''
            }
            <div className="sidebar-store__website">
              <span className="sidebar-store__desc">Contacts: </span>
            {
              this.props.currentStore.website ?
                <span className="sidebar-store__text"><a href="#">{this.props.currentStore.website}</a></span>
              : ''
            }
            </div>

            {
              this.props.currentStore.email ?
                <div className="sidebar-store__email">
                  <span className="sidebar-store__text">{this.props.currentStore.email}</span>
                </div>
              : ''
            }

            {
              this.props.currentStore.telephone ?
                <div className="sidebar-store__telephone">
                  <span className="sidebar-store__text">{this.props.currentStore.telephone}</span>
                </div>
              : ''
            }

            {
              this.props.currentStore.hours ?
                <div className="sidebar-store__hours">
                  <span className="sidebar-store__desc">Hours: </span>
                  <span className="sidebar-store__text">
                    Mon: {this.props.currentStore.hours.mon}
                  </span>
                  <span className="sidebar-store__text">
                    Tue: {this.props.currentStore.hours.tue}
                  </span>
                  <span className="sidebar-store__text">
                    Wed: {this.props.currentStore.hours.wed}
                  </span>
                  <span className="sidebar-store__text">
                    Thu: {this.props.currentStore.hours.thu}
                  </span>
                  <span className="sidebar-store__text">
                    Fri: {this.props.currentStore.hours.fri}
                  </span>
                  <span className="sidebar-store__text">
                    Sat: {this.props.currentStore.hours.sat}
                  </span>
                  <span className="sidebar-store__text">
                    Sun: {this.props.currentStore.hours.sun}
                  </span>
                </div>
              : ''
            }
          </div>
          :
          <div>Store info will be here</div>
      }
    </div>
  }
}

export default Sidebar;
