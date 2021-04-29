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
                <div>
                    <h1>{sessionUser.username}</h1>
                    <h2>{sessionUser.email}</h2>
                </div>
            </div>
            <Bookings />
        </>
    )
}

export default Listings;