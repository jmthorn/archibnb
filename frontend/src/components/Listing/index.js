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
              <h2 id="listing-address">{listing.address}</h2>
              <div className="images-container">
                <div id="primary-images">
                  <img src={listing.Images[0].url} alt="main-listing"></img>
                </div>
                <div className="secondary-images">
                  <img src={listing.Images[1].url} alt="secondary-listing"></img>
                  <img src={listing.Images[2].url} alt="secondary-listing"></img>
                </div>
              </div>

              <div className="house-info">
                <div className="primary-text">Entire house hosted by {listing.host_id}</div>
                <div className="secondary-text">
                  <div className="guests">{listing.guests} guests ∙ </div>
                  <div> {listing.bedrooms} bedrooms ∙ </div>
                  <div> {listing.baths} baths</div>
                </div>
              </div>
              
              <h1>Reviews</h1>
              <div className="reviews-container">
                {listing.Reviews.map((review) =>  {
                  console.log(review)
                  return (
                    <div className="review-container">
                      <div className="author-container">
                        {review.guest_id}
                        {/* <img src={}></img> */}
                        <div classname="author-info">

                        </div>
                      </div>
                      <div className="review">{review.review}</div>
                    </div>
                  )
                })}
              </div>
            </div>
        </>
    )
}

export default Listing;