import { csrfFetch } from './csrf';

const LOAD = 'reviews/LOAD'
const ADD_ONE = 'reviews/ADD_ONE'

const load = reviews => ({
    type:LOAD,
    reviews
})

const addOneReview = review => ({
    type: ADD_ONE, 
    review
})

export const getReviews = (id) => async dispatch => { 
    const res = await csrfFetch(`/api/reviews/${id}`);
    if(res.ok) { 
      const reviews = await res.json()
      dispatch(load(reviews))
    }
}


export const createReviewForm = newReview => async dispatch => {
  const res = await csrfFetch('/api/reviews', { 
    method: 'POST',
    body: JSON.stringify(newReview)
  })

  if(!res.ok) throw res;
  const review = await res.json();
  console.log("API REVIEW ", review)
  dispatch(addOneReview(review))
  return review;
}


const initialState = {};



const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const allReviews = {};
      action.reviews.forEach(review => {
        allReviews[review.id] = review;
      });
      return {
        ...allReviews,
        // ...state,
      };
    }
    case ADD_ONE: {
        const newState = {
          ...state,
          [action.review.id]: action.review
        };

        return newState;
    }
    
    default:
      return state;
  }
}

export default reviewReducer;