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
            const commentId = action.booking.id;
            const newState = { 
                ...state,
                [commentId]: ""
            }
            return newState
        }
        default:
            return state;
    }
}

export default bookingReducer;