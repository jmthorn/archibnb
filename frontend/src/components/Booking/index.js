import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {NavLink} from 'react-router-dom'
import {getBookings, cancelBooking} from '../../store/bookings'

import './Booking.css';


function Bookings () { 

  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser.id
    // const history = useHistory()
    const unsortedBookings = Object.values(useSelector(state => {
        return state.bookings
    }))

    const bookings = unsortedBookings.sort(function(a, b) {
    return b.id - a.id;
    })

    console.log(bookings)
    const dispatch = useDispatch()

    useEffect(() => { 
        dispatch(getBookings(userId))
    }, [userId,dispatch])
    
    if(!bookings) { 
        return null
    }
   
    const roundDate = (date) => { 
        return date.split("-").slice(1,3).join("/").split("T").slice(0,2)[0]
    }


    const cancelBookingButton = (id) => {
        let result = window.confirm("Are you sure you want to cancel your trip?")
        if (result){ 
            dispatch(cancelBooking(id))
        }
    }

    
    return(
        <>
            <div className="user-bookings-container">
            {bookings?.map((booking) => (
                <div key={booking.id} className="user-booking-container">
                    <NavLink  to={`/listings/${booking.listing_id}`}>
                        <img src={booking.Listing.Images[0].url} alt="listing"></img>
                    </NavLink>
                    <div className="booking-info">
                        <div className="listing-name">{booking.Listing.name}</div>
                        <div className="listing-architect">Architect: {booking.Listing.architect}</div>
                        {/* <div className="listing-host">{booking.Listing.host_id}</div> */}
                        <div className="listing-dates">Booking Dates: {roundDate(booking.start_date)} - {roundDate(booking.end_date)}</div>
                    </div>
                    <button type="button" onClick={() => cancelBookingButton(booking.id)}>Cancel Trip</button>
                </div>
            ))
            }
            </div>
        </>
    )
}

export default Bookings;