import React, { Component } from 'react';

const API_KEY = 'AIzaSyDhOc5OMsksRlpNfJFxk-fOGwGLeeBDoCo';

const url = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;

class GMap extends Component {
  componentDidMount() {
    const script = document.createElement('script');

    script.onload = () => {
      const google = window.google;

      var map = new google.maps.Map(this.refs.node, {
        center: { lat: 52.368717, lng: 4.897490 },
        zoom: 14
      });

      var marker = new google.maps.Marker({
        position: { lat: 52.368717, lng: 4.897490 },
        animation: google.maps.Animation.DROP,
        map: map,
        title: 'Hello World!'
      });
    };

    document.body.appendChild(script);
    script.src = url;
  }

  render() {
    return <div ref="node" className="gmap"></div>
  }
}

export default GMap;
