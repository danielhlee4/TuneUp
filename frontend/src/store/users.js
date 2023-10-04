import jwtFetch from "./jwt";

const RECEIVE_USER = "users/RECEIVE_USER"

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

export const update = (user) => updateUser(user, `api/users/${user._id}`)

export const updateUser = (newUserInfo, route) => async dispatch => {
    const res = await jwtFetch(route, {
        method: "PATCH",
        body: JSON.stringify(newUserInfo),
    });
    if (res.ok) {
        const newInfo = await res.json()
        dispatch(receiveUser(newInfo))
        return res
    }
}

export const usersReducer = (state = {}, action) => {
    Object.freeze(state)
    const nextState = { ...state }
    switch(action.type) {
        case RECEIVE_USER:
            return { ...nextState, [action.user.id]: action.user }
    }
}