import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import App from './App';
import About from './About';
import AddStore from './AddStore';
import Sidebar from './Sidebar';
import './index.css';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="stores/:id" component={Sidebar} />
      <Route path="about" component={About} />
      <Route path="add-store" component={AddStore} />
    </Route>
  </Router>),
  document.getElementById('root')
);
