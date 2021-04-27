import React from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import GoogleApiWrapper from '../GoogleMapsAPI';


import { getListings } from '../../store/listings'
import './Listings.css';


function Listings ({guests, location}) { 

  const allListings = useSelector(state => {
    return state.listings.list
  });

  const listings =  allListings.filter(listing => listing.guests >= 2)



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
                            <NavLink key={listing.name} to={`/listings/${listing.id}`}>
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
                        <GoogleApiWrapper />
                </div>
            </div>
        </>
    )
}

export default Listings;