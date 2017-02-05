import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import App from './App';
import About from './About';
import AddStore from './AddStore';
import './index.css';

const firebase = require('firebase');

const config = {
  apiKey: "AIzaSyDyRukiPIej168d6elewuZpF7VR4P0ueWU",
  authDomain: "ethnic-grocery-stores.firebaseapp.com",
  databaseURL: "https://ethnic-grocery-stores.firebaseio.com",
  storageBucket: "ethnic-grocery-stores.appspot.com",
  messagingSenderId: "131961135840"
};

firebase.initializeApp(config);

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="stores/:id" />
      <Route path="search/:value" />
      <Route path="about" component={About} />
      <Route path="add-store" component={AddStore} />
    </Route>
  </Router>),
  document.getElementById('root')
);
