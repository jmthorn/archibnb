import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {NavLink} from 'react-router-dom'
import {getBookings, cancelBooking} from '../../store/bookings'

import './Booking.css';


function Bookings () { 

  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser.id

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
        dispatch(cancelBooking(id))
    }

    return(
        <>
            <div className="user-bookings-container">
            {bookings?.map((booking) => (
                <NavLink key={booking.id} to={`/listings/${booking.Listing.id}`}>
                    <div className="user-booking-container">
                        <img src={booking.Listing.Images[0].url} alt="listing"></img>
                        <div className="booking-info">
                            <div className="listing-name">{booking.Listing.name}</div>
                            <div className="listing-architect">{booking.Listing.architect}</div>
                            {/* <div className="listing-host">{booking.Listing.host_id}</div> */}
                            <div className="listing-dates">{roundDate(booking.start_date)} - {roundDate(booking.end_date)}</div>
                        </div>
                        <button type="button" onClick={() => cancelBookingButton(booking.id)}></button>
                    </div>
                </NavLink>
            ))
            }
            </div>
        </>
    )
}

export default Bookings;