import React, { Component } from 'react';

import StoreInfo from './StoreInfo';
import './Sidebar.css';

const PLaceholder = () =>
  <div className="sidebar-placeholder" style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ marginTop: 0 }}>Click marker <br /> to see store info</div>
    <div style={{ marginTop: 40 }}>Login with Google <br /> to add a store</div>
  </div>;

class Sidebar extends Component {
  state = {
    store: this.props.currentStore
  };

  componentWillReceiveProps({ currentStore }) {
    this.setState({ store: currentStore });
  }

  render() {

    return <div className="sidebar fixed">

      {
        this.state.store.title ?
          <StoreInfo store={this.state.store} />
          :
          <PLaceholder />
      }

    </div>
  }
}

export default Sidebar;
