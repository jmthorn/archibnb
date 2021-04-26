import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';

import { getOneListing } from '../../store/listings'
import './Listing.css';


function Listing () { 

const { id } = useParams();
  const listing = useSelector(state => {
    return state.listings[id]
  });

  const dispatch = useDispatch()
  console.log(listing)
  useEffect(() => { 
    dispatch(getOneListing(id))
  }, [id, dispatch])

  if (!listing) {
    return null;
  }


    return(
        <>
            <div className="listing-container">
              <h1>{listing.name}</h1>
              <h2>{listing.address}</h2>
              <h2>{listing.name}</h2>
              <div className="images-container">
                <div id="primary-images">
                  <img src={listing.Images[0].url} alt="main-listing"></img>
                </div>
                <div className="secondary-images">
                  <img src={listing.Images[1].url} alt="secondary-listing"></img>
                  <img src={listing.Images[2].url} alt="secondary-listing"></img>
                </div>
              </div>
            </div>
        </>
    )
}

export default Listing;