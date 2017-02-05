import React, { Component } from 'react';
import { Link } from 'react-router';
import './Sidebar.css';

class StoresList extends Component {
  state = {
    stores: this.props.stores,
    filter: this.props.filter
  };

  componentWillReceiveProps({ stores, filter }) {
    this.setState({ stores, filter });
  }

  render() {
    return <div className="sidebar-stores-list">
      <div className="sidebar-stores-list__title">
        Search results for "{decodeURIComponent(this.state.filter)}":
      </div>

      {
        this.state.stores.map(store =>
          (<Link style={{color:'black'}} to={`/stores/${store.id}`} key={store.id}>
            <div className="sidebar-stores-list__store">
              <div>{store.title}</div>
              <div style={{ fontSize: 16, marginTop: 5 }}>{store.address}</div>
            </div>
          </Link>))
      }

    </div>
  }
}

export default StoresList;
