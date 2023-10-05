import jwtFetch from "./jwt";
import { RECEIVE_USER } from "./users";

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
    if (state.tuneups) {
        return Object.values(state.tuneups)
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

export const updateTuneUp = (updatedTuneUp) => async dispatch => {
    const res = await jwtFetch(`/api/tuneUps/${updatedTuneUp._id}`, {
        method: "PATCH",
        body: updatedTuneUp
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
            newState[action.data._id] = action.data;
            return newState;
        case RECEIVE_TUNEUPS:
            action.data.forEach(tuneUp => {
            newState[tuneUp._id] = tuneUp;
            });
            return newState;
        case RECEIVE_USER: 
            action.user.hostedTuneUps.forEach(hostedTuneUp => {
                newState[hostedTuneUp._id] = hostedTuneUp
            });
            action.user.joinedTuneUps.forEach(joinedTuneUp => {
                newState[joinedTuneUp._id] = joinedTuneUp
            })
            return newState;
        case REMOVE_TUNEUP:
            delete newState[action.tuneUpId]
            return newState
        default:
            return state
    }; 
};

export default tuneUpReducer;