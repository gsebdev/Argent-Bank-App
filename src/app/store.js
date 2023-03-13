import { configureStore } from '@reduxjs/toolkit'
import { actions as authActions, reducer as authReducer } from '../features/auth'
import { actions as userActions, reducer as userReducer } from '../features/user'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer
    }
})


export async function authSignIn(store, { email, password, rememberMe } ) {
    if (store.getState().auth.status === 'fetching') {
        return
    }
    store.dispatch(authActions.fetching())
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
            const token = data.body.token
            if(rememberMe) {
                localStorage.setItem('userToken', token)
            } else {
                sessionStorage.setItem('userToken', token)
            }
            store.dispatch(authActions.resolved(data.body))
        }
        else {
            store.dispatch(authActions.rejected(data))
        }
    } catch (error) {
        store.dispatch(authActions.rejected(error))
    }
}

export async function fetchOrUpdateUserProfile(store) {
    const state = store.getState()
    const userStore = state.user
    const token = state.auth.jwt
    if (userStore.status === 'fetching' || userStore.status === 'updating') {
        return
    }
    userStore.id ? store.dispatch(userActions.fetching) : store.dispatch(userActions.updating)
    try {
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer ' + token
            },
            method: 'POST'
        })
        const data = await response.json()
        if (response.ok) {
            store.dispatch(userActions.resolved(data))
        }
        else {
            store.dispatch(userActions.rejected(data))
        }
    } catch (error) {
        store.dispatch(userActions.rejected(error))
    }
}

export function signOut(store) {
    localStorage.clear()
    sessionStorage.clear()
    store.dispatch(authActions.signout())
    store.dispatch(userActions.signout())
}