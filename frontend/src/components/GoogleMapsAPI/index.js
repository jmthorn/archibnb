import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { useSearch } from '../../context/SearchContext';
import { useHistory } from 'react-router';

// import { Redirect, useHistory } from 'react-router';

const mapStyles = {
  width: '45%',
  height: '822px'
};



export function MapContainer (props) {
    const { coordinates} = props
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

    return (
      <Map
        google={props.google}
        zoom={7}
        style={mapStyles}
        initialCenter={
            location
        }
        setCenter
      >
        {coordinates.map((coordinate) => (
                <Marker
                key={coordinate.lat}
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
})(MapContainer);
 
