import jwtFetch from "./jwt";

const RECEIVE_TUNEUP = "tuneup/RECEIVE_TUNEUP";
const RECEIVE_TUNEUPS = "tuneup/RECEIVE_TUNEUPS";
const REMOVE_TUNEUP = "tuneup/REMOVE_TUNEUP";

const receiveTuneUp = (data) => {
    return {
        type: RECEIVE_TUNEUP,
        data
    };
};

const receiveTuneUps = (data) => {
    return {
        type: RECEIVE_TUNEUPS,
        data
    };
};

const removeTuneUp = (tuneUpId) => {
    return {
        type: REMOVE_TUNEUP,
        tuneUpId
    };
};

export const getTuneUps = (state) => {
    if (state.tuneUps) {
        return Object.values(state.tuneUps)
    } else {
        return []
    };
};

export const getTuneUp = (tuneUpId) => {
    return (state) => {
        if (state.tuneUps[tuneUpId]) {
            return state.tuneUps[tuneUpId]
        } else {
            return null
        };
    };
};

export const fetchAllTuneUps = () => async dispatch => {
    const res = await jwtFetch('/api/tuneUps');
  
    const data = await res.json();
    dispatch(receiveTuneUps(data));
  };

export const createTuneUp = (tuneUp) => async dispatch => {
    const res = await jwtFetch(`/api/tuneUps`, {
        method: "POST",
        body: tuneUp
    });
    const data = await res.json();
    dispatch(receiveTuneUp(data));
};

export const updateTuneUp = (formData, tuneUpId) => async dispatch => {
    const res = await jwtFetch(`/api/tuneUps/${tuneUpId}`, {
        method: "PATCH",
        body: formData,
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(receiveTuneUp(data));
    } else {
        console.log('Failed to update the tuneUp');
    }
};

export const deleteTuneUp = (tuneUpId) => async dispatch => {
    const res = await jwtFetch(`/api/tuneUps/${tuneUpId}`, {
        method: "DELETE"
    });
    if (res.ok) {
        dispatch(removeTuneUp(tuneUpId))
    };
};

const tuneUpReducer = (state = {}, action) => {
    let newState = {...state};
    switch (action.type) {
        case RECEIVE_TUNEUP:
            newState[action.data.tuneUp.id] = action.data.tuneUp;
            return newState;
        case RECEIVE_TUNEUPS:
            return {...newState, ...action.data.tuneUps}
        case REMOVE_TUNEUP:
            delete newState[action.tuneUpId]
            return newState
        default:
            return state
    }; 
};

export default tuneUpReducer