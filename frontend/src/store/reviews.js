import { csrfFetch } from './csrf';

const LOAD = 'reviews/LOAD'
const ADD_ONE = 'reviews/ADD_ONE'

const load = list => ({
    type:LOAD,
    list
})

const addOneReview = review => ({
    type: ADD_ONE, 
    review
})

export const getReviews = () => async dispatch => { 
    const res = await fetch('api/reviews');

    if(res.ok) { 
        const list = await res.json()
        dispatch(load(list))
    }
}

export const createReviewForm = newReview => async dispatch => {
  console.log("STORE REVIEW1:",newReview)
  //Returns: STORE REVIEW1: {review: "sdgsd", guest_id: 32, listing_id: 25}
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
  list: []
};



const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const allReviews = {};
      action.list.forEach(review => {
        allReviews[review.id] = review;
      });
      return {
        ...allReviews,
        ...state,
        list: action.list,
      };
    }
    case ADD_ONE: {
      if (!state[action.review.id]) {
        const newState = {
          ...state,
          [action.review.id]: action.review
        };
        const reviewList = newState.list.map(id => newState[id]);
        reviewList.push(action.review);
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