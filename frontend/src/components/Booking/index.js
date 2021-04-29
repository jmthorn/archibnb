import React from 'react';
import { useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'


import './Booking.css';


function Bookings () { 

  const sessionUser = useSelector(state => state.session.user);

  const history = useHistory()


if(!sessionUser) { 
    history.push("/")
}

    return(
        <>
            <div className="bookings-container">
                
            </div>
        </>
    )
}

export default Bookings;