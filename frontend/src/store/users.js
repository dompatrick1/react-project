import { csrfFetch } from './csrf.js';

const SET_USERS = "users/SET_USERS"

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        payload: users,
    }

};

export const getUsers = () => async dispatch => {
    const response = await csrfFetch(`/api/users`);

    if (!response.ok) {
        throw response
    }
    const users = await response.json();
    dispatch(setUsers(users));
}

const initialState = {};

const usersReducer = (users = initialState, action) => {
    switch (action.type) {
        case SET_USERS: {
            const usersPayload = action.payload
            const newUsers = {};
            for (const user of usersPayload) {
                console.log('???????', user)
              newUsers[user.id] = user;
            }
            return newUsers
        }
        default:
            return users;
    }
}

export default usersReducer
