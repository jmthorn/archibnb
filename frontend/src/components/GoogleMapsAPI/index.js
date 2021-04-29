import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { useSearch } from '../../context/SearchContext';
import { useHistory } from 'react-router';

// import { Redirect, useHistory } from 'react-router';

const mapStyles = {
  width: '45%',
  height: '800px'
};



export function MapContainer (props) {
    const { coordinates} = props
    console.log("COORDINATES", coordinates)
    const history = useHistory()

        const {
            location,
            setLocation
      } = useSearch()


    if (!location.lat) { 
      const newLocation = {lat: 32.8328 , lng: -117.2713}
      setLocation(newLocation)
    }


    const onClick2 = (id) => { 
      history.push(`/listings/${id}`)
    }

    console.log(location)
    return (
      <Map
        google={props.google}
        zoom={7}
        style={mapStyles}
        initialCenter={
            location
        }
      >
        {coordinates.map((coordinate) => (
                <Marker
                  position={{lat: coordinate.lat, lng: coordinate.long}} 
                  onClick={() => onClick2(coordinate.id)}
                />
            )
        )}
      </Map>
    );
  
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
  // apiKey: "AIzaSyBrXi5aamhelijXk37duN6o5lR3aPgJBiA"
})(MapContainer);
 
