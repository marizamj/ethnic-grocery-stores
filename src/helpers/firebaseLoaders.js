const firebase = require('firebase');

const toArrayStores = obj =>
  Object.keys(obj || {}).map(id => ({ id, ...obj[id] }));

const toArrayTypes = obj =>
  Object.keys(obj || {})
  .map(id => ({ id, name: obj[id] }))
  .sort((a, b) => +(a.name > b.name) || +(a.name === b.name) - 1);

const loadStoreTypes = f => {
  firebase.database().ref('storeTypes').on('value', snapshot => {
    f(toArrayTypes(snapshot.val()));
  });
};

const loadStores = f => {
  firebase.database().ref('stores').on('value', snapshot => {
    f(toArrayStores(snapshot.val()));
  });
};

const authListener = f => {
  firebase.auth().onAuthStateChanged(user => f(Object.assign({ email: '' }, user)));
};

export { loadStoreTypes, authListener, loadStores };
