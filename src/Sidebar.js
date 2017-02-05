import React, { Component } from 'react';

import StoreInfo from './StoreInfo';
import StoresList from './StoresList';
import './Sidebar.css';

const PLaceholder = () =>
  <div className="sidebar-placeholder" style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ marginTop: 0 }}>Click marker <br /> to see store info</div>
    <div style={{ marginTop: 40 }}>Login with Google <br /> to add a store</div>
  </div>;

class Sidebar extends Component {
  state = {
    store: this.props.currentStore,
    stores: this.props.stores,
    pathname: this.props.pathname,
    filter: this.props.filter
  };

  componentWillReceiveProps({ currentStore, stores, pathname, filter }) {
    this.setState({ store: currentStore, stores, pathname, filter });
  }

  render() {
    let elemToRender;

    switch (this.state.pathname.split('/')[1]) {
      case 'stores':
        elemToRender = <StoreInfo store={this.state.store} />;
        break;

      case 'search':
        elemToRender = <StoresList
          stores={this.state.stores}
          filter={this.state.filter}
        />
        break;

      default:
        elemToRender = <PLaceholder />;
    }

    return <div className="sidebar fixed">

      {elemToRender}

    </div>
  }
}

export default Sidebar;
