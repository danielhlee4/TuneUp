import jwtFetch from "./jwt";

const RECEIVE_SEARCH_RESULTS = "search/RECEIVE_SEARCH_RESULTS";
const CLEAR_SEARCH_RESULTS = "search/CLEAR_SEARCH_RESULTS";
const RECEIVE_SEARCH_ERRORS = "search/RECEIVE_SEARCH_ERRORS";
const CLEAR_SEARCH_ERRORS = "search/CLEAR_SEARCH_ERRORS";


export const receiveSearchResults = (users) => ({
    type: RECEIVE_SEARCH_RESULTS,
    users,
});

export const receiveSearchErrors = (errors) => ({
    type: RECEIVE_SEARCH_ERRORS,
    errors, 
});

export const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS,
});

export const clearSearchErrors = () => ({
    type: CLEAR_SEARCH_ERRORS,
});

export const searchUsers = (query) => async (dispatch) => {
  try {
    const response = await jwtFetch(
      `/api/users/search?query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    if (data.error) {
      dispatch(receiveSearchErrors(data.error));
    } else {
      dispatch(receiveSearchResults(data.users));
    }
  } catch (error) {
    dispatch(receiveSearchErrors("Failed to fetch search results."));
    console.error("Failed to fetch search results:", error);
  }
};


const initialState = {
    users: [],
    errors: null,
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_SEARCH_RESULTS:
            return {
                ...state,
                users: action.users,
                errors: null,
            };
        case RECEIVE_SEARCH_ERRORS:
            return {
                ...state,
                errors: action.errors,
            };
        case CLEAR_SEARCH_RESULTS:
            return initialState;
        default:
            return state;
    }
};

const nullSearchErrors = null; 

export const searchErrorsReducer = (state = nullSearchErrors, action) => {
  switch (action.type) {
    case RECEIVE_SEARCH_ERRORS:
      return action.errors;
    case RECEIVE_SEARCH_RESULTS:
    case CLEAR_SEARCH_ERRORS:
      return nullSearchErrors;
    default:
      return state;
  }
};


export default searchReducer;