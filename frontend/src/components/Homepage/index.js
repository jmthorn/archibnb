import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './Homepage.css';

function Homepage (props) { 

    const [guests, setGuests] = useState("")
    const [location, setLocation] = useState("")

    const history = useHistory()

    const onSubmit = (e) => { 
        e.preventDefault()
        
        history.push('/listings')
    }

    return(
        <>
            <div className="homepage-container">
                <form className="search-form-container" onSubmit={onSubmit}>
                    <label value = {location} onChange={(e) => setLocation(e.target.value)} className="input1"> Location
                        <input placeholder="Where are you going?"></input>
                    </label>
                    <label className="input2"> Check In
                        <input placeholder="Add Dates"></input>
                    </label>
                    <label className="input3"> Check Out
                        <input placeholder="Add Dates"></input>
                    </label>
                    <label className="input4"> Guests
                        <input value = {guests} onChange={(e) => setGuests(e.target.value)} placeholder="Add Guests"></input>
                    </label>
                    <button>Search</button>
                </form>
            </div>
        </>
    )
}

export default Homepage;