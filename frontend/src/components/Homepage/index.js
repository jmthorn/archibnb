import React from 'react';
import './Homepage.css';

function Homepage (props) { 

    return(
        <>
            <form className="search-form-container">
                <label> Location
                    <input placeholder="Where are you going?"></input>
                </label>
            </form>
            <div className="landingphoto">
                <img src='/images/landingpage.jpg' alt ="landing-page"></img>
            </div>
        </>
    )
}

export default Homepage;