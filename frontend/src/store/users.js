import jwtFetch from "./jwt";

const RECEIVE_USER = "users/RECEIVE_USER"

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

export const updateUser = (userId, updatedUser) => async dispatch => {
    const res = await jwtFetch(`api/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(updatedUser),
    });
    if (res.ok) {
        const data = await res.json()
        dispatch(receiveUser(data))
        return res
    }
}

export const usersReducer = (state = {}, action) => {
    Object.freeze(state)
    const nextState = { ...state }
    switch(action.type) {
        case RECEIVE_USER:
            nextState[action.user._id] = action.user;
            return nextState;
    }
}