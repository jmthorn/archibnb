const LOAD = 'listings/LOAD';
const ADD_ONE = 'listings/ADD_ONE';


const load = list => ({
  type: LOAD,
  list,
});

const addOneListing = listing => ({
  type: ADD_ONE,
  listing,
});


export const getListings = () => async dispatch => {
  const response = await fetch(`/api/listings`);

  if (response.ok) {
    const list = await response.json(); //list is an array of listings
    dispatch(load(list));
  }
};

export const getOneListing = (listingId) => async dispatch => {
  const res = await fetch(`/api/listings/${listingId}`)
  if (!res.ok) throw res;
  let listing = await res.json();
  dispatch(addOneListing(listing))
}


const initialState = {
  list: []
};


// const sortList = (list) => {
//   return list.sort((pokemonA, pokemonB) => {
//     return pokemonA.no - pokemonB.no;
//   }).map((pokemon) => pokemon.id);
// };


const listingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const allListings = {};
      action.list.forEach(listing => {
        allListings[listing.id] = listing;
      });
      return {
        ...allListings,
        ...state,
        list: action.list,
      };
    }
    case ADD_ONE: {
      if (!state[action.listing.id]) {
        const newState = {
          ...state,
          [action.listing.id]: action.listing
        };
        const listingList = newState.list.map(id => newState[id]);
        listingList.push(action.listing);
        // newState.list = sortList(pokemonList);
        return newState;
      }
      return {
        ...state,
        [action.listing.id]: {
          ...state[action.listing.id],
          ...action.listing,
        }
      };
    }
    
    default:
      return state;
  }
}

export default listingReducer;