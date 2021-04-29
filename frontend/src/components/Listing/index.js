import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useSearch } from '../../context/SearchContext';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import CreateReviewForm from '../CreateReviewForm'
import { getOneListing } from '../../store/listings'
import './Listing.css';
import Reviews from '../Reviews';
import { createBooking } from '../../store/bookings';

function Listing () { 

const sessionUser = useSelector(state => state.session.user);
const { id } = useParams();

const history = useHistory()

const {
        start_date,
        // setStartDate,
        end_date,
        // setEndDate,
        rounded_start_date,
        // setRoundedStartDate,
        rounded_end_date,
        // setRoundedEndDate,
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

  if(!guests) { 
    setGuests(1)
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <CreateReviewForm user={sessionUser} listing={id}/>
    );
  } else {
    sessionLinks = (
      <>
        <h2>Log in to leave a review!</h2>
      </>
    );
  }


  const bookStay = async(e) => { 
    e.preventDefault()

    let bookingForm = { 
      listing_id: id,
      guest_id: sessionUser.id,
      start_date,
      end_date
    }

    let createdBooking = await dispatch(createBooking(bookingForm))
    // history.push('/profile')

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
                  <div>{listing.guests} guests ∙ </div>
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
                  
                  <div className="price-container">
                      <div className="price1">${listing.price} </div>
                      <div className="per-night1"> / night</div>
                  </div>
                  <div className="bookingDates">
                    <div className="checkin-container">
                      <div>Check-In</div>
                      <div className="rounded-date">{rounded_start_date.toString()}</div>
                    </div>
                    <div className="checkout-container">
                      <div className="checkout">Check-Out</div>
                      <div className="rounded-date">{rounded_end_date.toString()}</div>
                    </div>
                  </div> 
                  <div className="guests1">
                    <div>Guests</div>
                    <div className="rounded-date">{guests}</div>
                  </div>
                  <button type="submit" onClick={bookStay}>Book Stay</button>
                </div>
              </div>
            </div>
        </>
    )
}

export default Listing;