import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useSearch } from '../../context/SearchContext';
import { useParams } from 'react-router';
import CreateReviewForm from '../CreateReviewForm'
import { getOneListing } from '../../store/listings'
import './Listing.css';
import Reviews from '../Reviews';


function Listing () { 

const sessionUser = useSelector(state => state.session.user);
const { id } = useParams();



const {
        start_date,
        setStartDate,
        end_date,
        setEndDate,
        rounded_start_date,
        setRoundedStartDate,
        rounded_end_date,
        setRoundedEndDate,
        guests,
        setGuests
  } = useSearch()


  const listing = useSelector(state => {
    return state.listings[id]
  });

  const dispatch = useDispatch()

  useEffect(() => { 
    dispatch(getOneListing(id))
  }, [id, dispatch])



  if (!listing) {
    return null;
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <CreateReviewForm user={sessionUser} listing={id}/>
    );
  } else {
    sessionLinks = (
      <>
        <h2>Log in to leave a reaview!</h2>
      </>
    );
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
                <div className="primary-text">Architect:  {listing.architect}</div>
                <div className="secondary-text">
                  <div className="guests">{listing.guests} guests ∙ </div>
                  <div> {listing.bedrooms} bedrooms ∙ </div>
                  <div> {listing.baths} baths</div>
                </div>
                <p>{listing.description}</p>
              </div>

              <h1>Reviews</h1>
              {sessionLinks}
              <div className="bottom-quadrant">
                <Reviews />
                <div className="bookings-container">
                  
                  <div className="price-holder">
                      <div className="price">${listing.price} </div>
                      <div className="per-night"> / night</div>
                      <div>
                        <div>{rounded_start_date.toString()}</div>
                        <div>{rounded_end_date.toString()}</div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
        </>
    )
}

export default Listing;