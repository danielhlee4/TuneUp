import jwtFetch from "./jwt";

export const RECEIVE_USER = "users/RECEIVE_USER"
export const RECEIVE_USERS = "users/RECEIVE_USERS"

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

const receiveUsers = (data) => {
    return {
        type: RECEIVE_USERS,
        data
    };
};

export const getUser = (userId) => {
    return (state) => {
        if (state.users) {
            return state.users[userId]
        } else {
            return null
        };
    };
};

export const getUsers = (state) => {
    if (state.users) {
        return Object.values(state.users)
    } else {
        return null
    };
};

export const fetchUser = (userId) => async dispatch => {
    const res = await jwtFetch(`/api/users/${userId}`)
    
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveUser(data));
    } else {
        const error = await res.json();
        throw error;
    };
};

export const fetchUsers = () => async dispatch => {
    const res = await jwtFetch('/api/users');

    const data = await res.json();
    dispatch(receiveUsers(data))
}

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

const usersReducer = (state = {}, action) => {
    Object.freeze(state)
    const nextState = { ...state }
    switch(action.type) {
        case RECEIVE_USER:
            nextState[action.user._id] = action.user;
            return nextState;
        case RECEIVE_USERS:
            action.data.forEach(user => {
                nextState[user._id] = user;
            });
            return nextState;
        default:
            return state;
    };
};

export default usersReducer