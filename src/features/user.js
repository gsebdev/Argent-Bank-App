import { createSlice } from "@reduxjs/toolkit"

// slice
export const { reducer, actions } = createSlice({
    name: 'user',
    
    initialState: {
        status: 'void',
        error: null,
        id: null,
        firstName: null,
        lastName: null
    },

    reducers: {
        fetching: (state) => {
            state = {
                status: 'fetching',
                error: null,
                id: null,
                firstName: null,
                lastName: null
            }
            return state
        },
        updating: (state) => {
            state.status = 'updating'
        },
        resolved: (state, { payload }) => {
            const { id, firstName, lastName } = payload.body
            state = {
                status: 'resolved',
                id: id,
                firstName: firstName,
                lastName: lastName
            }
            return state
        },
        rejected: (state, { payload }) => {
            state = {
                status: 'rejected',
                error: {
                    code: payload.status,
                    message: payload.message
                },
                id: null,
                firstName: null,
                lastName: null
            }
            return state
        },
        reset: (state) => {
            state = {
                status: 'void',
                error: null,
                id: null,
                firstName: null,
                lastName: null        
            }
            return state
        }
    }
})