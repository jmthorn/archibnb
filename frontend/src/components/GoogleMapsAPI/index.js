import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
// import { Redirect, useHistory } from 'react-router';

const mapStyles = {
  width: '45%',
  height: '800px'
};



export function MapContainer (props) {
    const { location , coordinates} = props
    // console.log("COORDINATES", coordinates[0].lat)


    return (
      <Map
        google={props.google}
        zoom={7}
        style={mapStyles}
        initialCenter={
            location
        }
      >
        {coordinates.forEach((coordinate) => (
                <Marker
                  title={''}
                  name={''}
                  position={{lat:coordinate.lat, long:coordinate.long}} 
                  // onClick={Redirect  to='/'}
                />
            )
        )}
      </Map>
    );
  
}

export default GoogleApiWrapper({
  // apiKey: process.env.GOOGLE_MAPS_KEY
  apiKey: "AIzaSyBrXi5aamhelijXk37duN6o5lR3aPgJBiA"
})(MapContainer);
 
