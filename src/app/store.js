import { configureStore } from '@reduxjs/toolkit'
import { reducer as authReducer } from '../features/auth'
import { reducer as userReducer } from '../features/user'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer
    }
})


