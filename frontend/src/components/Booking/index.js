import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'
import {getBookings} from '../../store/bookings'

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

   
    const roundDate = (date) => { 
        return date.split("-").join("/").split("T").slice(0,2)[0]
    }

    return(
        <>
            <div className="user-bookings-container">
            {bookings.map((booking) => (
                <div key={booking.id} className="user-booking-container">
                    <img src={booking.Listing.Images[0].url} alt="listing"></img>
                    <div className="booking-info">
                        <div className="listing-name">{booking.Listing.name}</div>
                        <div className="listing-architect">{booking.Listing.architect}</div>
                        <div className="listing-host">{booking.Listing.host_id}</div>
                        <div className="listing-dates">{roundDate(booking.start_date)} - {roundDate(booking.end_date)}</div>
                    </div>
                </div>
            ))
            }
            </div>
        </>
    )
}

export default Bookings;