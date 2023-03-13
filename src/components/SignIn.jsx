import { useState } from 'react'
import { useStore } from 'react-redux'
import { actions as authActions, authSignIn } from '../features/auth'

export default function SignIn() {
    const [userName, setUserName ] = useState('')
    const [ password, setPassword ] = useState(null)
    const [ rememberMe, setRememberMe ] = useState(false)

   const store = useStore()

    const handleFormSubmit = (e) => {
        e.preventDefault()
        authSignIn(store, {
            email: userName,
            password: password,
            rememberMe: rememberMe
        })     
        
    }

    return (
        <main className='main bg-dark'>
            <section className='sign-in-content'>
                <i className='fa fa-user-circle sign-in-icon'></i>
                <h1>Sign In</h1>
                <form
                    onSubmit={handleFormSubmit}    
                >
                    <div className='input-wrapper'>
                        <label htmlFor='username'>Username</label>
                        <input 
                            type='text' 
                            id='username'
                            onChange={(e) => {setUserName(e.target.value)}} 
                        />
                    </div>
                    <div className='input-wrapper'>
                        <label htmlFor='password'>Password</label>
                        <input 
                            type='password' 
                            id='password'
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                    </div>
                    <div className='input-remember'>
                        <input 
                            type='checkbox'
                            id='remember-me'
                            onChange={(e) => {setRememberMe(e.target.checked)}}
                        />
                        <label htmlFor='remember-me'>Remember me</label>
                    </div>

                    <button type='submit' className='sign-in-button'>Sign In</button>
                </form>
            </section>
      </main> 
    )
}