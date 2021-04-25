import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import { getListings } from '../../store/listings'
import './Listings.css';


function Listings () { 

  const listings = useSelector(state => {
    return state.listings.list.map(listingId => state.listings[listingId]);
  });
  console.log("LISTINGS:" ,listings)

  const dispatch = useDispatch()

  useEffect(() => { 
    dispatch(getListings())
  }, [dispatch, listings])

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
                            <NavLink key={listing.name} to={`/listing/${listing.id}`}>
                                <div className={"nav-entry"}>
                                    <div
                                    className="nav-entry-image"
                                    // style={{ backgroundImage: `url('${listing.Image.url}')` }}
                                    ></div>
                                    <div>
                                    <div className="primary-text">{listing.name}</div>
                                    <div className="secondary-text">
                                        {listing.bedrooms} {listing.guests}
                                    </div>
                                    </div>
                                </div>
                            </NavLink>
                        );
                        })}
                    </nav>
                </div>
                <div className="maps-container">

                </div>
            </div>
        </>
    )
}

export default Listings;