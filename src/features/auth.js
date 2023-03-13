import { createSlice } from "@reduxjs/toolkit"

const getInitialLoginState = () => {
    console.log(localStorage)
    if(sessionStorage.getItem('userToken')){
        return [true, sessionStorage.getItem('userToken')]
    }
    if(localStorage.getItem('userToken')){
        return [true, localStorage.getItem('userToken')]
    }
    return [false, null]
}
const [ loggedIn, token ] = getInitialLoginState()

// slice
export const { reducer, actions } = createSlice({
    name: 'auth',
    initialState: {
        loggedIn: loggedIn,
        status: 'void',
        error: null,
        jwt: token
    },
    reducers: {
        fetching: (state) => {
            state.status = 'fetching'
        },
        resolved: (state, { payload }) => {
            state.status = 'resolved'
            state.jwt = payload.token
            state.loggedIn = true
        },
        rejected: (state, { payload }) => {
            state.status = 'rejected'
            state.error = {
                code: payload.status,
                message: payload.message
            }
        },
        signout: (state) => {
            state.jwt = null
            state.status = 'void'
            state.loggedIn = false
        }
    }
})


