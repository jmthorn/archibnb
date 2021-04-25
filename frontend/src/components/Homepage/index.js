import React from 'react';
import './Homepage.css';

function Homepage (props) { 

    return(
        <>
            <div className="homepage-container">
                <form className="search-form-container">
                    <label className="input1"> Location
                        <input placeholder="Where are you going?"></input>
                    </label>
                    <label className="input2"> Check In
                        <input placeholder="Add Dates"></input>
                    </label>
                    <label className="input3"> Check Out
                        <input placeholder="Add Dates"></input>
                    </label>
                    <label className="input4"> Guests
                        <input placeholder="Add Guests"></input>
                    </label>
                    <button>Search</button>
                </form>
                <div className="landingphoto">
                    <img src='/images/landingpage.jpg' alt ="landing-page"></img>
                </div>
            </div>
        </>
    )
}

export default Homepage;