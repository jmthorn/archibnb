import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '45%',
  height: '800px'
};

export function MapContainer (props) {
  
    return (
      <Map
        google={props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: -1.2884,
            lng: 36.8233
          }
        }
      />
    );
  
}

export default GoogleApiWrapper({
  // apiKey: process.env.GOOGLE_MAPS_KEY
  apiKey: "AIzaSyBrXi5aamhelijXk37duN6o5lR3aPgJBiA"
})(MapContainer);
 
