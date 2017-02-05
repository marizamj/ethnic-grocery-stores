import React, { Component } from 'react';
import './GMap.css';

const API_KEY = 'AIzaSyDhOc5OMsksRlpNfJFxk-fOGwGLeeBDoCo';

const url = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.26`;

let google;
let map;

class GMap extends Component {
  state = {
    stores: [],
    markers: [],
    currentStore: this.props.currentStore
  };

  renderMarkers(props = this.props, state = this.state) {
    state.markers.forEach(marker => {
      marker.setMap(null);
    });

    const newMarkers = props.storesToShow.map(store => {
      return new google.maps.Marker({
        position: store.latLng,
        title: store.name,
        animation: store.id === props.currentStore.id ?
          google.maps.Animation.BOUNCE : null,
        store
      });
    });

    this.setState({ markers: newMarkers });

    newMarkers.forEach(marker => {
      marker.setMap(map);
      marker.addListener('click', () =>
        this.props.router.push(`/stores/${marker.store.id}`));
    });
  }

  componentWillReceiveProps({ storesToShow, currentStore }) {
    this.setState({ storesToShow, currentStore });
  }

  componentWillUpdate(nextProps, nextState) {
    const hasFilterChanged = nextProps.filter !== this.props.filter ||
      nextProps.storesToShow.length !== this.props.storesToShow.length;

    if (hasFilterChanged) this.renderMarkers(nextProps, nextState);

    if (nextProps.currentStore.title !== this.props.currentStore.title) {
      this.state.markers.forEach(marker => {
        if (marker.store.title === nextProps.currentStore.title) {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        } else {
          marker.setAnimation(null);
        }
      });
    }
  }

  componentDidMount() {
    const script = document.createElement('script');

    script.onload = () => {
      google = window.google;

      map = new google.maps.Map(this.refs.node, {
        center: { lat: 52.363717, lng: 4.877490 },
        zoom: 13
      });

      this.renderMarkers();
    };

    document.body.appendChild(script);
    script.src = url;
  }

  render() {
    return <div ref="node" className="gmap" width="100%" height="100%"></div>
  }
}

export default GMap;
