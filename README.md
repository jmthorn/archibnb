# Welcome to ArchiBnb

In this AirBnb clone, a user can search for and book an architecturally significany house for a stay. The user can also manage their bookings and leave a review for the property.

A live Link to our website can be found here: https://archibnb.herokuapp.com/

## A walkthrough of the website

![](https://archibnb-images.s3.us-east-2.amazonaws.com/1-20.gif)

## Technologies used to build the site

- HTML , Vanilla CSS, Javascript (Front-end)
- React (Front-end)
- Redux (Front-end)
- Heroku (hosting services) (Front-end)
- csurf, dotenv, bcrypt, cookie-parser (Back-end)
- express, express-session, express-validator (Back-end)
- nodemon (Back-end)
- postgreSQL, sequelize (Back-end)

## Functionalities

- User authentication is completed by hashing passwords using bcrypt js library (csurf protected as well)
- The user can search for properties around the world by entering the location, booking dates and guest count.
- Once logged in, a user can book a listing for a specified amount of time. Once made, the user has the ability to cancel the booking on their profile page.
- The user can leave a review on a given property.
- Used Modals to render the login functionality
- Implemented AJAX when creating a review on a specific listing page or deleting a booking on the profile page
- Logged in user has a profile page
- The navbar includes routes to the home page and allows user to either view their profile and logout or sign up/log in based on their session status.

## Backend bookings routes code snippets:

```
const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');


const router = express.Router();


router.get('/:id', asyncHandler(async function(req, res) {
  const bookings = await db.Booking.findAll({
    where: {
      guest_id: req.params.id
    },
    include: [
      { model:db.User},
      { model:db.Listing,
        include:[{
          model: db.Image
        }]
      }
    ],
    order: [['updatedAt', 'DESC']]
  });
  return res.json(bookings)

}))

router.delete('/:id', asyncHandler(async function(req, res) {
  const booking = await db.Booking.destroy({
    where: {
      id: req.params.id
    }
  });
  return res.json(req.params.id)

}))

router.post(
  '/',
  asyncHandler(async function (req, res) {
    const booking = await db.Booking.create(req.body);
    const newBooking = await db.Booking.findOne({
      where: {
        id: booking.id
      },
      include: [
      { model:db.User},
      { model:db.Listing,
        include:[{
          model: db.Image
        }]
      }]
    })
    return res.json(newBooking)
  })
);


module.exports = router;

```

## Frontend routes code snippets:

```

import { csrfFetch } from './csrf';


const LOAD = 'bookings/LOAD'
const ADD_ONE = 'bookings/ADD_ONE'
const DELETE_ONE = 'bookings/DELETE_ONE'

const load = bookings => ({
    type:LOAD,
    bookings
})


const addBooking = booking => ({
    type: ADD_ONE,
    booking
})

const deleteBooking = booking => ({
    type: DELETE_ONE,
    booking
})


export const getBookings = userId => async dispatch => {
    const res = await csrfFetch(`/api/bookings/${userId}`);
    if(res.ok) {
        const bookings = await res.json()
        dispatch(load(bookings))
    }
}

export const createBooking = newBooking => async dispatch => {
    const res = await csrfFetch(`/api/bookings`, {
        method: 'POST',
        body: JSON.stringify(newBooking)
    })
    if(!res.ok) throw res;
    const booking = await res.json()
    dispatch(addBooking(booking))
    return booking;
}

export const cancelBooking = userId => async dispatch => {
    const res = await csrfFetch(`/api/bookings/${userId}`, {
        method: 'DELETE',
    })
    if(!res.ok) throw res;
    const booking = await res.json()
    dispatch(deleteBooking(booking))
    return booking;
}

const initialState = {};

const bookingReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const allBookings = {}
            action.bookings.forEach(booking => {
                allBookings[booking.id] = booking
            })
            return  {
                ...allBookings
            }
        }
        case ADD_ONE: {
            const newState = {
                ...state,
                [action.booking.id]: action.booking
            }
            return newState;
        }
        case DELETE_ONE: {
            const newState = {
                ...state,
            }
            delete newState[action.booking]
            return newState
        }
        default:
            return state;
    }
}

export default bookingReducer;

```

## Challenges

- One of the most challenging aspects of this project was the ability to filter listings based on the location entered by the user. This involved first using the Google Geocoding API to transform the user input into a specific longitude and latitude. Once plotting this point and passing it to a custom React context, the Google Maps API could then use the point as its initialCenter. Once this location had been established, it could be added to the array of queried listings which could then be sorted by an algorithm to order the queries by relative location the user's input coordinates.

## Future Implementations

- Search bar functionality utilizing booking input to further filter queried listings

## The ArchiBnb Creator

- ===[@jmthorn](https://github.com/jmthorn) 🐈
