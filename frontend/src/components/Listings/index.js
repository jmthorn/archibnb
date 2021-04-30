import React from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import { useDispatch, useSelector } from 'react-redux'
import GoogleApiWrapper from '../GoogleMapsAPI';


import { getListings } from '../../store/listings'
import './Listings.css';


function Listings () { 

    const {
            location,
            // start_date,
            // end_date,
            guests,
      } = useSearch()

  const allListings = useSelector(state => {
    return state.listings.list
  });

  let listings;
  listings =  allListings.filter(listing => listing.guests >= guests)
  listings =  listings.filter(listing => listing.guests <= guests + 5)
  //provides coordinates to the Google maps API through props
  let  coordinates = () => { 
      let coordinateObjects = []
    listings.forEach((listing) => { 
        const lat = listing.latitude;
        const long = listing.longitude;
        const id = listing.id
        let coorObj = {lat, long, id}
        coordinateObjects.push(coorObj)
    })
    return coordinateObjects
  }


//attempting to return listings array sorted by distance to input address ==================================

let initialLocation = {}
initialLocation.latitude = location.lat
initialLocation.longitude = location.lng

  
//add initalLocation to array for sorting
listings.unshift(initialLocation)

function calculateDistance(lat1, lon1, lat2, lon2) {
  let radlat1 = Math.PI * lat1/180
  let radlat2 = Math.PI * lat2/180
  let theta = lon1-lon2
  let radtheta = Math.PI * theta/180
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60 * 1.1515
  return dist
}


for (let  i = 0; i < listings.length; i++) {
  listings[i]["distance"] = calculateDistance(listings[0]["latitude"],listings[0]["longitude"],listings[i]["latitude"],listings[i]["longitude"]);
}

listings.sort(function(a, b) { 
  return a.distance - b.distance;
});

//remove initialLocation from array
listings.shift()

// =============================================================================




  const dispatch = useDispatch()

  useEffect(() => { 
    dispatch(getListings())
  }, [dispatch])

  if (!listings) {
    return null;
  }


    return(
        <>
            <div className="listings-page-container">
                <div className="listings-container">
                    <nav>
                        {listings.map((listing) => {
                        return (
                            <NavLink key={listing.id} to={`/listings/${listing.id}`}>
                                <div className={"nav-entry"}>
                                    <div
                                    className="nav-entry-image"
                                    style={{ backgroundImage: `url(${listing.Images[2].url})` }}
                                    ></div>
                                    <div className="listing-info">
                                        <div className="primary-text">{listing.name}</div>
                                        <div className="secondary-text">
                                            <div className="guests">{listing.guests} guests ∙ </div>
                                            <div> {listing.bedrooms} bedrooms ∙ </div>
                                            <div> {listing.baths} baths</div>
                                        </div>
                                    </div>
                                    <div className="price-holder">
                                        <div className="price">${listing.price} </div>
                                        <div className="per-night"> / night</div>

                                    </div>
                                </div>
                            </NavLink>
                        );
                        })}
                    </nav>
                </div>
                <div className="maps-container">
                    <GoogleApiWrapper coordinates={coordinates()}/>
                </div>
            </div>
        </>
    )
}

export default Listings;