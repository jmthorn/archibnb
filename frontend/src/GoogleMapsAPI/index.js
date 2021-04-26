import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export const MapContainer = ({props}) => {
    return (
      <Map google={props.google} zoom={14}>
 
        <Marker onClick={props.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={props.onInfoWindowClose}>
            <div>
              {/* <h1>{state.selectedPlace.name}</h1> */}
            </div>
        </InfoWindow>
      </Map>
    );
  }

 
export default GoogleApiWrapper({
  apiKey: "AIzaSyCQ0U5FCTmOHQH1RDCGWMmJyTD-Z85d1lA"
})(MapContainer)