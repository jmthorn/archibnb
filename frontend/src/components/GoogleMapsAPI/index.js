import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '45%',
  height: '800px'
};

export function MapContainer (props) {
    
    const { location } = props
    return (
      <Map
        google={props.google}
        zoom={7}
        style={mapStyles}
        initialCenter={
            location
        }
      />
    );
  
}

export default GoogleApiWrapper({
  // apiKey: process.env.GOOGLE_MAPS_KEY
  apiKey: "AIzaSyBrXi5aamhelijXk37duN6o5lR3aPgJBiA"
})(MapContainer);
 
