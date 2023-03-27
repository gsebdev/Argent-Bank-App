import { createSlice } from "@reduxjs/toolkit"

const getInitialLoginState = () => {
    if(sessionStorage.getItem('userToken')){
        return sessionStorage.getItem('userToken')
    }
    if(localStorage.getItem('userToken')){
        return localStorage.getItem('userToken')
    }
    return null
}
const userToken = getInitialLoginState()

// slice
export const { reducer, actions } = createSlice({
    name: 'auth',
    initialState: {
        status: 'void',
        error: null,
        userToken: userToken
    },
    reducers: {
        fetching: (state) => {
            state.status = 'fetching'
        },
        resolved: (state, { payload }) => {
            state.status = 'resolved'
            state.userToken = payload.token
        },
        rejected: (state, { payload }) => {
            state.status = 'rejected'
            state.error = {
                code: payload.status,
                message: payload.message
            }
        },
        reset: (state) => {
            state.userToken = null
            state.status = 'void'
            state.error = null
        }
    }
})


