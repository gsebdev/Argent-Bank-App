import { actions as authActions } from '../features/auth'
import { actions as userActions } from '../features/user'
import { api } from './api'

// login thunk middleware
export function authLogin({ email, password, rememberMe }) {
    return async (dispatch, getState) => {
        if (getState().auth.status === 'fetching') {
            return
        }
        dispatch(authActions.fetching())
        try {
            const data = await api.login({ email, password })
            const token = data.body.token

            if (rememberMe) {
                localStorage.setItem('userToken', token)
            } else {
                sessionStorage.setItem('userToken', token)
            }

            dispatch(authActions.resolved(data.body))

        } catch ({ status, message }) {
            dispatch(authActions.rejected({ status, message }))
        }
    }
}
// get user profile thunk middleware
export function getUserProfile() {
    return async (dispatch, getState) => {
        const userStore = getState().user
        const token = getState().auth.userToken
        if (userStore.status === 'fetching' || userStore.status === 'updating') {
            return
        }
        dispatch(userActions.fetching())
        try {
            const data = await api.getProfile(token)
            dispatch(userActions.resolved(data))

        } catch ({ status, message }) {
            if (status === 401) {
                signOut(dispatch)
            } else {
                dispatch(userActions.rejected({ status, message }))
            }
        }
    }

}
// signout thunk middleware
export function signOut(dispatch) {
    localStorage.clear()
    sessionStorage.clear()
    dispatch(authActions.reset())
    dispatch(userActions.reset())
}
// modify user lastname and firstname thunk middleware
export function modifyUserProfile(user) {
    return async (dispatch, getState) => {
        const state = getState()
        const token = state.auth.userToken
        const userStore = state.user

        // if values are not defined or empty string, keeps the state value
        const firstName = user.firstName ? user.firstName : userStore.firstName
        const lastName = user.lastName ? user.lastName : userStore.lastName
        
        // if no changes on both firstname and lastname then do nothing
        if(firstName === userStore.firstName && lastName === userStore.lastName) {
            return
        }

        if (userStore.status === 'updating' || userStore.status === 'fetching') {
            return
        }
       
        dispatch(userActions.updating())

        try {
            const data = await api.modifyProfile(token, { firstName: firstName, lastName: lastName })
            dispatch(userActions.resolved(data))
        } catch ({ status, message }) {
            if (status === 401) {
                signOut(dispatch)
            } else {
                dispatch(userActions.rejected({ status, message }))
            }
        }   
    }
}