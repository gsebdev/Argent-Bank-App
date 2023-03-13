import { createSlice } from "@reduxjs/toolkit"

/* const authInitialState = {
    status: 'void',
    error: null,
    jwt: null
} */
/* 
// actions
const FETCHING = 'auth/fetching'
const RESOLVED = 'auth/resolved'
const REJECTED = 'auth/rejected'
const LOGOUT = 'auth/logout'

// actions creators
const authFetching = () => ({ type: FETCHING })
const authResolved = (data) => ({ type: RESOLVED, payload: data })
const authRejected =  (error) => ({ type: REJECTED, payload: error })
const authLogout = () => ({ type: LOGOUT })
 */
// slice
export const { reducer, actions } = createSlice({
    name: 'auth',
    initialState: {
        loggedIn: false,
        status: 'void',
        error: null,
        jwt: null
    },
    reducers: {
        fetching: (state) => {
            state.status = 'fetching'
            return state
        },
        resolved: (state, { payload }) => {
            state.status = 'resolved'
            state.jwt = payload.token
            state.loggedIn = true
            return state
        },
        rejected: (state, { payload }) => {
            console.log(payload)
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

export async function authSignIn(store, { email, password } ) {
    if (store.getState().auth.status === 'fetching') {
        return
    }
    store.dispatch(actions.fetching())
    try {
        const response = await fetch('http://localhost:3001/api/v1/user/login', {
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify( {
                email: email,
                password: password
            })
        })
        const data = await response.json()
        if (response.ok) {
           store.dispatch(actions.resolved(data.body))
        }
        else {
            store.dispatch(actions.rejected(data))
        }
    } catch (error) {
        store.dispatch(actions.rejected(error))
    }
}
