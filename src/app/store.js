import { configureStore } from '@reduxjs/toolkit'
import {reducer as authReducer} from '../features/auth'

/* function reducer(state, action){
    if (action.type === 'userSignIn') {
        return {
            ...state,
            user: {
                loggedIn: true,
                username: action.payload.username,
                id: action.payload.userId
            }
        }
    }

    return state
} */

/* export const userSignIn = (user) => ({
    type: 'userSignIn',
    payload: user
}) */

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})