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
      console.log("REVIEWS STORE",reviews)
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


const initialState = {
  reviews: []
};



const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const allReviews = {};
      action.reviews.forEach(review => {
        allReviews[review.id] = review;
      });
      return {
        ...allReviews,
        ...state,
        reviews: action.reviews,
      };
    }
    case ADD_ONE: {
      if (!state[action.review.id]) {
        const newState = {
          ...state,
          [action.review.id]: action.review
        };
        const reviewList = newState.list?.map(id => newState[id]);
        reviewList?.push(action.review);
        return newState;
      }
      return {
        ...state,
        [action.review.id]: {
          ...state[action.review.id],
          ...action.review,
        }
      };
    }
    
    default:
      return state;
  }
}

export default reviewReducer;