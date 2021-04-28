import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Calendar from 'react-calendar';
import { useSearch } from '../../context/SearchContext';
import './Homepage.css';
import 'react-calendar/dist/Calendar.css';
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyBrXi5aamhelijXk37duN6o5lR3aPgJBiA");
// Geocode.setApiKey(process.env.GOOGLE_MAPS_KEY);


function Homepage () { 
    
    const [showCalender1, setShowCalender1] = useState(false);
    const [showCalender2, setShowCalender2] = useState(false);
    
    const {
        location,
        setLocation,
        start_date,
        setStartDate,
        end_date,
        setEndDate,
        rounded_start_date,
        setRoundedStartDate,
        rounded_end_date,
        setRoundedEndDate,
        guests,
        setGuests
    } = useSearch()


    const openCalander1 = () => {
        if (showCalender1) return;
        setShowCalender1(true);
    };
    const openCalander2 = () => {
        if (showCalender2) return;
        setShowCalender2(true);
    };
    
    const history = useHistory()
    
    const onSubmit = async (e) => { 
        e.preventDefault()

        let res = await Geocode.fromAddress(location)
        const { lat, lng } = res.results[0].geometry.location;
        let address = {lat, lng}
        setLocation(address)
        let searchFrom = { 
            address,
            start_date,
            end_date,
            guests,
        }
        console.log(searchFrom, rounded_start_date, rounded_end_date)
        history.push('/listings')
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


    function roundMinutes(date) {
        date.setHours(date.getHours() + Math.round(date.getMinutes()/60));
        date.setMinutes(0, 0, 0);
        return date;
    }

    const onChange1 = (e) => { 
        setStartDate(e)
        let rounded_start_date = roundMinutes(e).toString().split(" ").slice(1,4).join(" ")
        setRoundedStartDate(rounded_start_date)
    }

    const onChange2 = (e) => { 
        setEndDate(e)
        let rounded_end_date = roundMinutes(e).toString().split(" ").slice(1,4).join(" ")
        setRoundedEndDate(rounded_end_date)
    }


    return(
        <>
            <div className="homepage-container">
                <img alt="background" src="https://archibnb-images.s3.us-east-2.amazonaws.com/landingpage.jpg"></img>
                <form className="search-form-container" onSubmit={onSubmit}>
                    <label value = {location} onChange={(e) => setLocation(e.target.value)} className="input1"> Location
                        <input placeholder="Where are you going?"></input>
                    </label>
                    <label onClick={openCalander1} value={rounded_start_date} className="input2"> Check In
                        <input placeholder="Add Dates"></input>
                    </label>
                    <label onClick={openCalander2} value={rounded_end_date} className="input3"> Check Out
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
                    onChange={onChange1}
                    value={start_date}
                />
            )}
            {showCalender2 && (
                <Calendar
                    className="calender calender2"
                    onChange={onChange2}
                    value={end_date}
                />
            )}
        </>
    )
}

export default Homepage;
