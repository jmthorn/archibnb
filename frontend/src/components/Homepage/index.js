import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Calendar from 'react-calendar';
import './Homepage.css';
import 'react-calendar/dist/Calendar.css';


function Homepage (props) { 
    
    
    const [showCalender1, setShowCalender1] = useState(false);
    const [showCalender2, setShowCalender2] = useState(false);
    const [location, setLocation] = useState("")
    const [start_date, setStartDate] = useState(new Date())
    const [end_date, setEndDate] = useState(new Date())
    const [guests, setGuests] = useState("")
    
    const openCalander1 = () => {
        if (showCalender1) return;
        setShowCalender1(true);
    };
    const openCalander2 = () => {
        if (showCalender2) return;
        setShowCalender2(true);
    };

    const history = useHistory()

    const onSubmit = (e) => { 
        e.preventDefault()

        let searchFrom = { 
            address: location,
            start_date,
            end_date,
            guests,
        }
        console.log(searchFrom)
        // history.push('/listings')
    }

    useEffect(() => {
        if (!showCalender1) return;

        const closeCalender1 = () => {
        setShowCalender1(false);
        };

        document.addEventListener('click', closeCalender1);
    
        return () => document.removeEventListener("click", closeCalender1);
    }, [showCalender1]);

    useEffect(() => {
        if (!showCalender2) return;

        const closeCalender2 = () => {
        setShowCalender2(false);
        };

        document.addEventListener('click', closeCalender2);
    
        return () => document.removeEventListener("click", closeCalender2);
    }, [showCalender2]);

    return(
        <>
            <div className="homepage-container">
                <img alt="background" src="https://archibnb-images.s3.us-east-2.amazonaws.com/landingpage.jpg"></img>
                <form className="search-form-container" onSubmit={onSubmit}>
                    <label value = {location} onChange={(e) => setLocation(e.target.value)} className="input1"> Location
                        <input placeholder="Where are you going?"></input>
                    </label>
                    <label onClick={openCalander1} value={start_date} className="input2"> Check In
                        <input placeholder="Add Dates"></input>
                    </label>
                    <label onClick={openCalander2} value={end_date} onChange={(e) => setEndDate(e.target.value)} className="input3"> Check Out
                        <input placeholder="Add Dates"></input>
                    </label>
                    <label className="input4"> Guests
                        <input value = {guests} onChange={(e) => setGuests(e.target.value)} placeholder="Add Guests"></input>
                    </label>
                    <button>Search</button>
                </form>
            </div>
            {showCalender1 && (
                <Calendar
                    className="calender calender1"
                    onChange={(e) => setStartDate(e)}
                    value={start_date}
                />
            )}
            {showCalender2 && (
                <Calendar
                    className="calender calender2"
                    onChange={(e) => setEndDate(e)}
                    // value={end_date}
                />
            )}
        </>
    )
}

export default Homepage;