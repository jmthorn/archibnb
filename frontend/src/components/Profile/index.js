import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'


import './Profile.css';


function Listings () { 

  const sessionUser = useSelector(state => state.session.user);

  const history = useHistory()


if(!sessionUser) { 
    history.push("/")
}

    return(
        <>
            <div className="profile-container">
                <h1>{sessionUser.username}</h1>
                <h1>{sessionUser.email}</h1>
            </div>
        </>
    )
}

export default Listings;