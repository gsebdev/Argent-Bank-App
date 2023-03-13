import React, { useEffect } from 'react'
import { useSelector, useStore } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchOrUpdateUserProfile, signOut } from '../app/store'
import logo from '../img/argentBankLogo.png'

export default function Header() {
  const userLoggedIn = useSelector((state) => state.auth.loggedIn)
  const user = useSelector((state) => state.user)
  const store = useStore()

  useEffect(() => {
    if (userLoggedIn) {
      fetchOrUpdateUserProfile(store)
    }
  }, [store, userLoggedIn])

  const handleSignOutClick = (e) => {
    e.preventDefault()
    signOut(store)
  }

  return (
    <nav className='main-nav'>
      <Link className='main-nav-logo' to='/'>
        <img
          className='main-nav-logo-image'
          src={logo}
          alt='Argent Bank Logo'
        />
        <h1 className='sr-only'>Argent Bank</h1>
      </Link>
      <div>
        {
          !userLoggedIn ?
            <Link className='main-nav-item' to='sign-in'>
              <i className='fa fa-user-circle'></i>
              Sign In
            </Link> :
            <React.Fragment>
              <Link className='main-nav-item' to='account'>
                <i className='fa fa-user-circle' />
                {user.firstName}
              </Link>
              <a className='main-nav-item' href='/' onClick={handleSignOutClick}>
                <i className='fa fa-sign-out' />
                Sign Out
              </a>
            </React.Fragment>
        }

      </div>
    </nav>
  )
}