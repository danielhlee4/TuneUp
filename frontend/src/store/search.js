import jwtFetch from "./jwt";

const RECEIVE_SEARCH_RESULTS = "search/RECEIVE_SEARCH_RESULTS";
const CLEAR_SEARCH_RESULTS = "search/CLEAR_SEARCH_RESULTS";
const RECEIVE_SEARCH_ERRORS = "search/RECEIVE_SEARCH_ERRORS";
const CLEAR_SEARCH_ERRORS = "search/CLEAR_SEARCH_ERRORS";

export const receiveSearchResults = (results) => ({
  type: RECEIVE_SEARCH_RESULTS,
  results,
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

export const search = (criteria) => async (dispatch) => {
  const queryString = new URLSearchParams(criteria).toString();
  try {
    const response = await jwtFetch(`/api/search?${queryString}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    if (data.length === 0) {
      dispatch(
        receiveSearchErrors(
          `Sorry, no results found for "${criteria.q}".
          `
        )
      );
    } else {
      dispatch(receiveSearchResults(data));
    }
  } catch (error) {
    dispatch(receiveSearchErrors("Failed to fetch search results."));
    console.error("Failed to fetch search results:", error);
  }
};

const initialSearchState = {
  results: [],
  errors: null,
};

const searchReducer = (state = initialSearchState, action) => {
  switch (action.type) {
    case RECEIVE_SEARCH_RESULTS:
      return {
        ...state,
        results: action.results,
        errors: null,
      };
    case RECEIVE_SEARCH_ERRORS:
      return {
        ...state,
        errors: action.errors,
      };
    case CLEAR_SEARCH_RESULTS:
      return initialSearchState;
    default:
      return state;
  }
};

export default searchReducer;
