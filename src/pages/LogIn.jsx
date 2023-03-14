import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authLogin } from '../app/middlewares'
import Loader from '../components/Loader'
import ErrorDisplay from './ErrorDisplay'


export default function LogIn() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState(null)
    const [rememberMe, setRememberMe] = useState(false)

    const auth = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(() => {
        if (auth.loggedIn) {
            navigate('/profile')
        }

    }, [auth.loggedIn, navigate])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        dispatch(authLogin({
            email: userName,
            password: password,
            rememberMe: rememberMe
        }))

    }

    return (
        <main className='main bg-dark'>
            {auth.status === 'fetching' ?
                <Loader /> :
                <section className='sign-in-content'>
                    <i className='fa fa-user-circle sign-in-icon'></i>
                    <h1>Sign In</h1>
                    {auth.error &&
                        <div className='error-message'>
                            <span>{auth.error.code === 400 ? 'Identifiants invalides !' : 'Erreur du serveur'}</span>
                        </div>
                    }
                    <form
                        onSubmit={handleFormSubmit}
                    >
                        <div className='input-wrapper'>
                            <label htmlFor='username'>Username</label>
                            <input
                                type='text'
                                id='username'
                                onChange={(e) => { setUserName(e.target.value) }}
                            />
                        </div>
                        <div className='input-wrapper'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                id='password'
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </div>
                        <div className='input-remember'>
                            <input
                                type='checkbox'
                                id='remember-me'
                                onChange={(e) => { setRememberMe(e.target.checked) }}
                            />
                            <label htmlFor='remember-me'>Remember me</label>
                        </div>

                        <button type='submit' className='sign-in-button'>Sign In</button>
                    </form>
                </section>
            }

        </main>
    )
}