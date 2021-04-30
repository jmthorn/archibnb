import React from 'react';
import { useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'
import Bookings from '../Booking';
import './Profile.css';


function Listings () { 

  const sessionUser = useSelector(state => state.session.user);
  const bookings = Object.values(useSelector(state => {
        return state.bookings
  }))

  const history = useHistory()


  if(!sessionUser) { 
    history.push("/")
  }

  let sessionLinks;
  if (bookings.length) {
    sessionLinks = (
      <Bookings />
    );
  } else {
    sessionLinks = (
      <>
        <p>You have no trips planned!</p>
      </>
    );
  }

  const updateUserForm = () => { 
    
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
                <button type="button" onClick={() => updateUserForm}>Edit Profile</button>
            </div>
            <div className="bookings">
                <h1 className="bookingsTitle">Bookings</h1>
                {sessionLinks}
            </div>
        </>
    )
}

export default Listings;