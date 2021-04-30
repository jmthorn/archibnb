import React from 'react';
import { useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'
import Bookings from '../Booking';
import './Profile.css';


function Listings () { 

  const sessionUser = useSelector(state => state.session.user);
  console.log(sessionUser)
  const history = useHistory()


if(!sessionUser) { 
    history.push("/")
}

    return(
        <>
            <div className="profile-container">
                <div className="profile-image">
                    <img src={sessionUser.image_url} alt="user"></img>
                </div>
                <div className="user-info">
                    <h1>{sessionUser.username}</h1>
                    <h2>Name: {sessionUser.first_name} {sessionUser.last_name}</h2>
                    <h2>Email: {sessionUser.email}</h2>
                </div>
            </div>
            <h1 className="bookingsTitle">Bookings</h1>
            <Bookings />
        </>
    )
}

export default Listings;